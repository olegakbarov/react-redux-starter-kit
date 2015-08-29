import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import NavItem from './NavItem';

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
        <ul className="nav navbar-nav navbar-right">
          <NavItem to="/">Blog</NavItem>
          <NavItem to="/dashboard">Dashboard</NavItem>
          <NavItem to="/profile">Profile</NavItem>
          <NavItem to="/logout" onClick={this.handleLogout}>Logout</NavItem>
        </ul>
      );
    } else {
      return (
        <ul className="nav navbar-nav navbar-right">
          <NavItem to="/">Blog</NavItem>
          <NavItem to="/signup">Sign up</NavItem>
          <NavItem to="/login">Login</NavItem>
        </ul>
      );
    }
  }

  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid container-navigation">
          <div className="navbar-header">
            <button
              className="navbar-toggle collapsed"
              type="button"
              data-toggle="collapse"
              data-target="#main-nav"
            >
              <span className="sr-only">Toggle navigation</span>
            </button>

            <Link
              to="/"
              activeClassName=""
              className="navbar-brand"
              title="BLOG"
            >
              Reblog
            </Link>
          </div>

          <div className="collapse navbar-collapse" id="main-nav">
            {this.renderNavBar()}
          </div>
        </div>
      </nav>
    );
  }
}
