import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from '../components/Header';
import { fetchProfile, logout } from '../actions/auth';

@connect(state => ({
  router: state.router,
  username: state.auth.username,
  users: state.users
}))
export default class App extends React.Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    dispatch: PropTypes.func.isRequired,
    error: PropTypes.string,
    username: PropTypes.string,
    users: PropTypes.object.isRequired
  }

  static contextTypes = {
    router: PropTypes.object
  }

  static fillStore(redux) {
    return redux.dispatch(fetchProfile());
  }

  render() {
    const {
      dispatch,
      username,
      users
    } = this.props;

    return (
      <div>
        <Header
          user={users[username]}
          router={this.context.router}
          {...bindActionCreators({ logout }, dispatch)}
        />

        {this.props.children}
      </div>
    );
  }
}
