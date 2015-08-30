import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../../actions/posts';
import Posts from '../../components/PostsList';

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
      <div className="container-fluid content-wrapper">
        <div className="row">
          <div className="col-sm-9">
            <Posts posts={this.props.posts} />
          </div>

          <div className="col-sm-3">
            <div className="panel-body">
              <h4>Brought to you by:</h4>
              <a href="https://twitter.com/faergeek">@faergeek</a><br />
              <a href="https://twitter.com/olegakbarov">@olegakbarov</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
