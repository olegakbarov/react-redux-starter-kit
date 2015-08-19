import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { signup } from '../actions/auth';

@connect(state => ({
  auth: state.auth
}), {
  signup
})
export default class Signup extends React.Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    signup: PropTypes.func.isRequired
  }

  static contextTypes = {
    router: React.PropTypes.object
  }

  state = {
    email: '',
    password: ''
  };

  handleChange = field => e => {
    e.preventDefault();
    this.setState({ [field]: e.target.value });
  }

  handleSubmit = e => {
    e.preventDefault();

    const { email, password } = this.state;
    const router = this.context.router;

    this.props.signup(email, password, router);
  }

  render() {
    const { auth: { error } } = this.props;
    const { email, password } = this.state;

    return (
      <div className="panel panel-default form-panel">
        <div className="panel-body">
          <div className="content-wrapper">
            <h1>Sign up</h1>

            {error
              ? <div className="alert alert-danger">{error.message}</div>
              : null}

            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email</label>

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
                type="submit"
                className="btn btn-lg btn-block btn-success margin-top-20"
              >
                Sign me up
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
