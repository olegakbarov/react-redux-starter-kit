import styles from './styles.styl';

import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';

@CSSModules(styles)
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
    this.props.signup(email, password);
  }

  render() {
    const { auth: { error } } = this.props;
    const { email, password } = this.state;

    return (
        <div styleName="wrapper">
          <div styleName="title">Sign up</div>

          {error
            ? <div>{error.message}</div>
            : null}

          <form onSubmit={this.handleSubmit}>
            <label htmlFor="email">Email</label>

            <input
              styleName="input"
              value={email}
              onChange={this.handleChange('email')}
              id="email"
              type="email"
              placeholder="Email"
              required
            />

            <label htmlFor="password">Password</label>

            <input
              styleName="input"
              value={password}
              onChange={this.handleChange('password')}
              id="password"
              type="password"
              placeholder="Password"
              required
            />

            <button
              styleName="btn"
              type="submit"
            >
            Sign me up
          </button>
        </form>
      </div>
    );
  }
}
