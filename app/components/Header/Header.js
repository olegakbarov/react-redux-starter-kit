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
    const { loggedIn, router } = this.props;
    const isActive = router.isActive.bind(router);

    if (loggedIn) {
      return (
        <ul styleName="nav">
          <NavItem to="/" active={isActive("/")}>Blog</NavItem>
          <NavItem to="/dashboard" active={isActive("/dashboard")}>Dashboard</NavItem>
          <NavItem to="/profile" active={isActive("/profile")}>Profile</NavItem>
          <NavItem to="/logout" active={isActive("/logout")} onClick={this.handleLogout}>Logout</NavItem>
        </ul>
      );
    } else {
      return (
        <ul styleName="nav">
          <NavItem to="/" active={isActive("/")}>Blog</NavItem>
          <NavItem to="/signup" active={isActive("/signup")}>Sign up</NavItem>
          <NavItem to="/login" active={isActive("/login")}>Login</NavItem>
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
