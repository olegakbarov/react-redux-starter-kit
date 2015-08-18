import React, { PropTypes } from 'react';
import LinkedStateMixin from 'react/lib/LinkedStateMixin';
import reactMixin from 'react-mixin';
import { connect } from 'react-redux';
import { login } from '../actions/auth';

let initialState = {
  error: '',
  email: '',
  password: ''
};

@connect(state => ({
  lastError: state.auth.lastError,
  token: state.auth.token
}))
@reactMixin.decorate(LinkedStateMixin)
export default class Login extends React.Component {
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

  _onLogin(event) {
    event.preventDefault();

    let email = this.state.email;
    let password = this.state.password;

    this.props.dispatch(login(email, password, this.context.router));
  }

  render() {
    return (
      <div className="panel panel-default form-panel">
        <div className="panel-body">
          <div className="content-wrapper">
            <h1>Login</h1>

            {
              this.state.error
                ? <div className="alert alert-danger">{this.state.error}</div>
                : null
            }

            <form role="form" onSubmit={::this._onLogin}>
              <div className="form-group">
                <label htmlFor="email">E-mail</label>

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

              <button className="btn btn-default margin-top-20"
                type="submit">Login</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
