import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { login } from '../actions/auth';

@connect(state => ({
  auth: state.auth
}), {
  login
})
export default class Login extends React.Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired
  }

  static contextTypes = {
    router: React.PropTypes.object
  }

  state = {
    email: '',
    password: ''
  }

  handleChange = field => e => {
    e.preventDefault();
    this.setState({ [field]: e.target.value });
  }

  handleLogin = e => {
    e.preventDefault();

    const { email, password } = this.state;
    const router = this.context.router;

    this.props.login(email, password, router);
  }

  render() {
    const { auth: { error } } = this.props;
    const { email, password } = this.state;

    return (
      <div className="panel panel-default form-panel">
        <div className="panel-body">
          <div className="content-wrapper">
            <h1>Login</h1>

            {error
              ? <div className="alert alert-danger">{error.message}</div>
              : null}

            <form onSubmit={this.handleLogin}>
              <div className="form-group">
                <label htmlFor="email">E-mail</label>

                <input
                  className="form-control input-email input-lg"
                  value={email}
                  onChange={this.handleChange('email')}
                  id="email"
                  type="email"
                  placeholder="Email"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>

                <input
                  className="form-control input-password input-lg"
                  value={password}
                  onChange={this.handleChange('password')}
                  id="password"
                  type="password"
                  placeholder="Password"
                  required
                />
              </div>

              <button
                className="btn btn-lg btn-block btn-success margin-top-20"
                type="submit"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
