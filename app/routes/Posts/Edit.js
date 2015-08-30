import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { savePost, fetchPost } from '../../actions/posts';
import PostEditor from '../../components/PostEditor';

@connect(state => ({
  user: state.auth,
  posts: state.posts.items
}), {
  savePost,
  fetchPost
})
export default class PostsEdit extends React.Component {
  static propTypes = {
    params: PropTypes.object,
    posts: PropTypes.object,
    savePost: PropTypes.func.isRequired
  }

  static fillStore(redux, props) {
    return redux.dispatch(fetchPost(props.params.id));
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
      post = this.props.posts[id];
    } else {
      post = {
        title: '',
        content: ''
      };
    }

    return (
      <div className="editor-wrapper">
        <PostEditor
          post={post}
          onSave={this.handleSave}
          onPublish={this.handlePublish}
        />
      </div>
    );
  }
}
