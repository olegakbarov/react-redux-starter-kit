import React, { PropTypes } from 'react';
import PostEditor from '../components/PostEditor';
import { saveDraft, publishPost } from '../actions/blog';

export default class Post extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    posts: PropTypes.array,
    user: PropTypes.object.isRequired
  }
  render() {
    const {
      dispatch,
      user
    } = this.props;
    return (
      <PostEditor
        userId={user.id}
        saveDraft={post => dispatch(saveDraft(post))}
        publish={id => dispatch(publishPost(id))}
      />
    );
  }
}
