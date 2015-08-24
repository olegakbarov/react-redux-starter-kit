import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchSinglePost } from '../../actions/blog';
import SinglePost from '../../components/SinglePost';

@connect(state => ({
  posts: state.posts.items
}))
export default class ViewSinglePost extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    params: PropTypes.object,
    posts: PropTypes.object
  }
  static fillStore(redux, nextProps) {
    let id = nextProps.params.id;
    return redux.dispatch(fetchSinglePost(id));
  }
  render() {
    const post = this.props.posts[this.props.params.id];

    return (
      <SinglePost post={post} />
    );
  }
}
