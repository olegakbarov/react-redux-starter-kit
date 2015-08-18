import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Icon from 'react-evil-icons';
import NavItem from './NavItem';

export default class Header extends React.Component {
  static propTypes = {
    logout: PropTypes.func.isRequired,
    router: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
  }

  _onLogout(event) {
    const { logout, router } = this.props;

    event.preventDefault();

    logout(router);
  }

  renderNavBar() {
    const user = this.props.user;

    if (user) {
      const { firstname, lastname, username } = user;
      const name = [firstname, lastname].join(' ').trim() ||
                   username.trim() ||
                   'Mr. Anonymous';

      return (
        <ul className="nav navbar-nav navbar-right">
          <NavItem to="/">Blog</NavItem>
          <NavItem to="/dashboard">Dashboard</NavItem>
          <NavItem to="/profile">{name}</NavItem>
          <NavItem to="/logout" onClick={::this._onLogout}>Logout</NavItem>
        </ul>
      );
    } else {
      return (
        <ul className="nav navbar-nav navbar-right">
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
              <Icon name="ei-navicon" size="m" />
            </button>

            <Link
              to="/"
              activeClassName=""
              className="brand"
              title="Get Expert">—</Link>
          </div>

          <div className="collapse navbar-collapse" id="main-nav">
            {this.renderNavBar()}
          </div>
        </div>
      </nav>
    );
  }
}
