import styles from './styles.styl';

import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import NavItem from './NavItem';
import CSSModules from 'react-css-modules';

@CSSModules(styles)
export default class Header extends React.Component {
  static propTypes = {
    loggedIn: PropTypes.bool,
    logout: PropTypes.func.isRequired,
    router: PropTypes.object.isRequired
  }

  handleLogout = e => {
    const { logout, router } = this.props;

    e.preventDefault();

    logout(router);
  }

  renderNavBar() {
    const { loggedIn } = this.props;

    if (loggedIn) {
      return (
        <ul styleName="nav">
          <NavItem to="/">Blog</NavItem>
          <NavItem to="/dashboard">Dashboard</NavItem>
          <NavItem to="/profile">Profile</NavItem>
          <NavItem to="/logout" onClick={this.handleLogout}>Logout</NavItem>
        </ul>
      );
    } else {
      return (
        <ul styleName="nav">
          <NavItem to="/">Blog</NavItem>
          <NavItem to="/signup">Sign up</NavItem>
          <NavItem to="/login">Login</NavItem>
        </ul>
      );
    }
  }

  render() {
    return (
      <nav styleName="navbar">
          <Link
            to="/"
            activeClassName=""
            title="Reblog"
          >
          <span styleName="brand">
            Reblog
          </span>
          </Link>

          {this.renderNavBar()}
      </nav>
    );
  }
}
