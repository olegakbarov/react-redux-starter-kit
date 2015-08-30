import React, { PropTypes } from 'react';

export default class SinglePost extends React.Component {
  static propTypes = {
    post: PropTypes.object
  }

  render() {
    const { post } = this.props;

    if (!post) return null;

    const { title, content, userId } = post;

    return (
      <div>
        <h3>{title}</h3>
        <p>{content}</p>
        <small>written by {userId}</small>
      </div>
    );
  }
}
