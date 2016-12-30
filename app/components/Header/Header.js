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
    let navItems;

    if (loggedIn) {
      navItems = [
        { to: '/', title: 'Blog' },
        { to: '/dashboard', title: 'Dashboard' },
        { to: '/profile', title: 'Profile' },
        { to: '/logout', title: 'Logout', onClick: this.handleLogout }
      ];
    } else {
      navItems = [
        { to: '/', title: 'Blog' },
        { to: '/signup', title: 'Sign up' },
        { to: '/login', title: 'Login' }
      ];
    }
    navItems = navItems.map((props) =>
      <NavItem
        key={props.to}
        to={props.to}
        active={isActive(props.to)}
        onClick={props.onClick}
      >
        {props.title}
      </NavItem>
    );
    return (
      <ul styleName="nav">
        {navItems}
      </ul>
    );
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
