import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Dashboard from '../components/Dashboard/Dashboard';
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
export default class DashboardRoute extends React.Component {
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
    const unpublishedPosts = this.props.posts;
    const publishedPosts = this.props.posts.filter(item => item.published);

    return (
      <Dashboard
        publishedPosts={publishedPosts}
        unpublishedPosts={unpublishedPosts}
        togglePublishPost={this.togglePublishPost}
      />
    );
  }
}
