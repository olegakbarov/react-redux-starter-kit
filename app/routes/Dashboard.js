import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import {
  fetchPosts,
  savePost
} from '../actions/posts';

@connect(state => ({
  posts: state.posts.list.map(id => state.posts.items[id])
}), {
  fetchPosts,
  savePost
})
export default class Dashboard extends React.Component {
  static propTypes = {
    posts: PropTypes.array.isRequired,
    savePost: PropTypes.func.isRequired
  }

  static fillStore(redux) {
    return redux.dispatch(fetchPosts());
  }

  togglePublishPost = (id, status) => {
    const post = this.props.posts.find(post => post.id === id);

    this.props.savePost({
      ...post,
      published: !status
    });
  }

  render() {
    const publishedPosts = this.props.posts
      .filter(item => item.published)
      .map(post => (
        <tr key={post.id}>
          <td><small>{post.title}</small></td>

          <td className="table-button">
            <Link to={`/dashboard/add/${post.id}`}>Edit</Link>
          </td>

          <td className="table-button">
            <a
              onClick={() => this.togglePublishPost(post.id, post.published)}
            >
              Unpublish
            </a>
          </td>
        </tr>
      ));

    const unpublishedPosts = this.props.posts
      .filter(item => !item.published)
      .map(post => (
        <tr key={post.id}>
          <td><small>{post.title}</small></td>

          <td className="table-button">
            <Link to={`/dashboard/add/${post.id}`}>Edit</Link>
          </td>

          <td className="table-button">
            <a
            onClick={() => this.togglePublishPost(post.id, post.published)}
            >
              Publish
            </a>
          </td>
        </tr>
      ));

    return (
      <div className="container-fluid content-wrapper">
        <h3>Published posts</h3>

        <Link to={'/dashboard/add'}>
          <button
            className="btn btn-success margin-top-20 margin-bottom-20"
          >
            Add Post
          </button>
        </Link>

        <hr />

        <table className="table">
          <tbody>{publishedPosts}</tbody>
        </table>

        <h3>Unpublished posts</h3>

        <table className="table">
          <tbody>{unpublishedPosts}</tbody>
        </table>
      </div>
    );
  }
}
