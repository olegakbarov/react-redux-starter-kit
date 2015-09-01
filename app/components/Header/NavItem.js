import React, { PropTypes } from 'react';
import { Link, State } from 'react-router';
import classNames from 'classnames';
import reactMixin from 'react-mixin';

@reactMixin.decorate(State)
export default class NavItem extends React.Component {
  static propTypes = {
    to: PropTypes.string.isRequired
  }

  render() {
    return (
      <li className={classNames({
        active: this.isActive(this.props.to)
      })}>
        <Link {...this.props} activeClassName="" />
      </li>
    );
  }
}
