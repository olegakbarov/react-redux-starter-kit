import React, { PropTypes } from 'react';
import LinkedStateMixin from 'react/lib/LinkedStateMixin';
import reactMixin from 'react-mixin';
import { connect } from 'react-redux';
import { signup } from '../actions/auth';

let initialState = {
  error: '',
  email: '',
  password: '',
  confirmPassword: '',
  finalStep: false
};

@connect(state => ({
  lastError: state.auth.lastError,
  token: state.auth.token
}))
@reactMixin.decorate(LinkedStateMixin)
export default class Signup extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  }

  static contextTypes = {
    router: React.PropTypes.object
  }

  constructor(...args) {
    super(...args);

    this.state = { ...initialState };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.token) {
      this.setState({ ...initialState });
    }

    if (nextProps.lastError) {
      this.setState({ error: nextProps.lastError.message });
    }
  }

  _onSubmit = (event) => {
    event.preventDefault();

    let email = this.state.email;
    let password = this.state.password;
    let username = this.state.username;
    let shortDescription = this.state.shortDescription;

    this.props.dispatch(signup(
      email,
      password,
      username,
      shortDescription,
      this.context.router
    ));
  }

  moveToNextStep = () => {
    this.setState({ finalStep: true });
  }

  getFirstStep = () => {
    return (this.state.finalStep)
      ? null
      : (
        <div>
          <div className="form-group">
            <label htmlFor="email">Email</label>

            <input
              className="form-control input-email input-lg"
              id="email"
              type="email"
              valueLink={this.linkState('email')}
              placeholder="Email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>

            <input
              className="form-control input-password input-lg"
              id="password"
              type="password"
              valueLink={this.linkState('password')}
              placeholder="Password"
              required
            />
          </div>

          <a className="btn btn-default margin-top-20"
            onClick={this.moveToNextStep}>Yep!</a>
        </div>
      );
  }

  getFinalStep = () => {
    return (!this.state.finalStep)
      ? null
      : (
        <div>
          <div className="form-group">
            <label htmlFor="confirm-password">Username</label>

            <input
              className="form-control input-password input-lg"
              type="text"
              valueLink={this.linkState('username')}
              placeholder="username"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirm-password">I am a ...</label>

            <input
              className="form-control input-password input-lg"
              type="text"
              valueLink={this.linkState('shortDescription')}
              placeholder="I am a..."
              required
            />
          </div>

          <button className="btn btn-success margin-top-20"
            type="submit">Signup</button>
        </div>
      );
  }

  render() {
    return (
      <div className="panel panel-default form-panel">
        <div className="panel-body">
          <div className="content-wrapper">
            <h1>Sign up</h1>

            {this.state.error
              ? <div className="alert alert-danger">{this.state.error}</div>
              : null}

            <form onSubmit={this._onSubmit} fole="form">
              {this.getFirstStep()}
              {this.getFinalStep()}
            </form>
          </div>
        </div>
      </div>
    );
  }
}
