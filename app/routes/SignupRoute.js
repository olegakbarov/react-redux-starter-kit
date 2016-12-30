import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { signup } from '../actions/auth';
import Signup from '../components/Auth/Signup';

@connect(state => ({
  auth: state.auth
}), {
  signup
})
export default class SignupRoute extends React.Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    signup: PropTypes.func.isRequired
  }

  static contextTypes = {
    router: React.PropTypes.object
  }

  handleSubmit = (email, password) => {
    const router = this.context.router;

    this.props.signup(email, password, router);
  }

  render() {
    return (
        <Signup
          auth={this.props}
          handleSubmit={this.handleSubmit}
          signup={this.props.signup}
        />
    );
  }
}
