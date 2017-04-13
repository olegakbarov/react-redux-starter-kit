import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { emailLogin } from 'actions';
import LoginView from './LoginView';

class Login extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  handleLogin = (email, password) => {
    this.props.dispatch(emailLogin(email, password));
  }

  render() {
    return (
      <LoginView
        auth={this.props}
        handleLogin={this.handleLogin}
       />
    );
  }
}

function select(state) {
  return {
    auth: state.auth
  };
}

export default connect(select)(Login);
