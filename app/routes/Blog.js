import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
// import Icon from 'react-evil-icons';
import { fetchPublishedPosts } from '../actions/blog';

@connect(state => ({
  posts: state.posts,
  auth: state.auth
}))
export default class Posts extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    posts: PropTypes.array
  }
  static fillStore(redux) {
    return redux.dispatch(fetchPublishedPosts());
  }
  render() {
    let posts = this.props.posts
    .filter(item => item.published)
    .map(post => {
      return (
        <div className="panel panel-default">
          <div className="panel-body">
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <small>{post.tags}</small>
          </div>
        </div>
      );
    });
    return (
      <div className="container-fluid content-wrapper">
        <div className="row">
          <div className="col-sm-9">
          {posts}
          </div>
          <div className="col-sm-3">
            <div className="panel panel-default">
              <div className="panel-body">
                <h4>About author</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
