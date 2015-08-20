import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchPublishedPosts } from '../actions/blog';
import { Link } from 'react-router';
import moment from 'moment';

@connect(state => ({
  posts: state.posts,
  auth: state.auth
}))
export default class Blog extends React.Component {
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
        const pb = moment(post.date).format('dddd, h:mm a');
        return (
            <Link to={`/posts/${post.id}`}>
              <h2 className="post-header-link">{post.title}</h2>
              <small>{pb}</small>
            </Link>
        );
      });
    return (
      <div className="container-fluid content-wrapper">
        <div className="row">

          <div className="col-sm-9">
            {posts}
          </div>

          <div className="col-sm-3">
            <div className="panel-body">
              <h4>Brought to you by:</h4>
              <a href="https://twitter.com/faergeek">@faergeek</a>
              <br />
              <a href="https://twitter.com/olegakbarov">@olegakbarov</a>
            </div>
          </div>

        </div>
      </div>
    );
  }
}
