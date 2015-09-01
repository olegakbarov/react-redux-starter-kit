import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../../actions/posts';
import Posts from '../../components/PostsList/PostsList';

@connect(state => ({
  auth: state.auth,
  posts: state.posts.list.map(id => state.posts.items[id])
}))
export default class PostsList extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    posts: PropTypes.array
  }

  static fillStore(redux) {
    return redux.dispatch(fetchPosts());
  }

  render() {
    return (
      <Posts posts={this.props.posts} />
    );
  }
}
