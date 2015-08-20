import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { savePost, fetchSinglePost } from '../../actions/blog';
import PostEditor from '../../components/PostEditor';

@connect(state => ({
  user: state.auth,
  posts: state.posts
}), {
  savePost,
  fetchSinglePost
})
export default class Edit extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    params: PropTypes.object,
    posts: PropTypes.object,
    publish: PropTypes.func.isRequired,
    savePost: PropTypes.func.isRequired
  }
  static fillStore(redux, nextState) {
    return redux.dispatch(fetchSinglePost(nextState.params.id));
  }
  handleSave = (post) => {
    this.props.savePost(post);
  }
  handlePublish = (post) => {
    this.props.savePost({ ...post, published: true });
  }
  render() {
    let post;
    const { params: { id } } = this.props;
    if (id) {
      post = this.props.posts.find(post => post.id === id);
    } else {
      post = {
        title: '',
        content: '',
        tags: ''
      };
    }
    return (
      <div className="editor-wrapper clearfix">
        <PostEditor
          post={post}
          onSave={this.handleSave}
          onPublish={this.handlePublish}
        />
      </div>
    );
  }
}
