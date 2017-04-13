import s from './styles.css';

import React, { PropTypes, Component } from 'react';

export default class LoginView extends Component {
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
      <div className={s.wrapper}>

        {error
          ? <div>{error.message}</div>
          : null}

        <form className="form" onSubmit={this.handleLogin}>
            <div className={s.title}>Login</div>

            <input
              className="text_input"
              value={email}
              onChange={this.handleChange('email')}
              type="email"
              placeholder="email"
              required
            />

            <input
              className="text_input"
              value={password}
              onChange={this.handleChange('password')}
              type="password"
              placeholder="password"
              required
            />

            <div>
              <button
                className={s.btn}
                type="submit"
              >
              Login
              </button>
            </div>
        </form>
      </div>
    );
  }
}
