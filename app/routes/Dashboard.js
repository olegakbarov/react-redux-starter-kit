import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import {
  fetchPublishedPosts,
  fetchUnpublishedPosts,
  savePost
} from '../actions/blog';

@connect(state => ({
  posts: state.posts
}), {
  fetchPublishedPosts,
  fetchUnpublishedPosts,
  savePost
})
export default class Dashboard extends React.Component {
  static propTypes = {
    posts: PropTypes.array.isRequired,
    savePost: PropTypes.func.isRequired
  }
  static fillStore(redux) {
    return Promise.all([
      redux.dispatch(fetchPublishedPosts()),
      redux.dispatch(fetchUnpublishedPosts())
    ]);
  }
  togglePublishPost = (id, status) => {
    const post = this.props.posts.find(post => post.id === id);

    this.props.savePost({
      ...post,
      published: !status
    });
  }
  render() {
    let publishedPosts = this.props.posts
      .filter(item => item.published)
      .map(post => {
        return (
            <tr key={post.id}>
              <td>
                <small>{post.title}</small>
              </td>

              <td className="table-button">
                <Link to={`/dashboard/add/${post.id}`}>
                  <a
                    >
                    Edit
                  </a>
                </Link>
              </td>

              <td className="table-button">
              <a
                onClick={() => this.togglePublishPost(post.id, post.published)}
              >
                Unpublish
              </a>
              </td>
            </tr>
          );
      });

    let unpublishedPosts = this.props.posts
      .filter(item => !item.published)
      .map(post => {
        return (
            <tr key={post.id}>
              <td>
                <small>{post.title}</small>
              </td>

              <td className="table-button">
                <Link to={`/dashboard/add/${post.id}`}>
                  <a>
                    Edit
                  </a>
                </Link>
              <td className="table-button">
                <a
                onClick={() => this.togglePublishPost(post.id, post.published)}
                >
                  Publish
                </a>
              </td>
              </td>
            </tr>
          );
      });

    return (
      <div className="container-fluid content-wrapper">
        <h3>Published posts</h3>
        <table className="table">
          <tbody>
            {publishedPosts}
          </tbody>
        </table>
        <h3>Unpublished posts</h3>
        <table className="table">
          <tbody>
            {unpublishedPosts}
          </tbody>
        </table>
        <Link to={'/dashboard/add'}>
          <button className="btn btn-success">Add Post</button>
        </Link>
      </div>
    );
  }
}
