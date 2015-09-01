import styles from './styles.styl';
import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';

@CSSModules(styles)
export default class Login extends React.Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    handleLogin: PropTypes.func.isRequired
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

    this.props.handleLogin(email, password);
  }

  render() {
    const { auth: { error } } = this.props;
    const { email, password } = this.state;

    return (
      <div styleName="wrapper">
        <div styleName="title">Login</div>

        {error
          ? <div>{error.message}</div>
          : null}

        <div styleName="code">
          <code>
            <span styleName="hilight">email@adress</span>
          </code>
          <br />
          <code>
            <span styleName="hilight">pass</span>
          </code>
        </div>

        <form onSubmit={this.handleLogin}>
            <label htmlFor="email">E-mail</label>

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
            Login
            </button>
        </form>
      </div>
    );
  }
}
