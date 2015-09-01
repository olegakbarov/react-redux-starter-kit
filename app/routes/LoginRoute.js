import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { login } from '../actions/auth';
import Login from '../components/Auth/Login';

@connect(state => ({
  auth: state.auth
}), {
  login
})
export default class LoginRoute extends React.Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired
  }

  static contextTypes = {
    router: React.PropTypes.object
  }

  handleLogin = (email, password) => {
    const router = this.context.router;
    this.props.login(email, password, router);
  }

  render() {
    return (
      <Login
        auth={this.props}
        handleLogin={this.handleLogin}
       />
    );
  }
}
