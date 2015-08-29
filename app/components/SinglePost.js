import React, { PropTypes } from 'react';

export default class SinglePost extends React.Component {
  static propTypes = {
    post: PropTypes.object
  }
  render() {
    if (this.props.post) {
      const post = this.props.post;
      return (
        <div className="container-fluid post-wrapper">
          <div className="row">
            <div className="panel-body">
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              <small>written by {post.userId}</small>
            </div>
          </div>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}
