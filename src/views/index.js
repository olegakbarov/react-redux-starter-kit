/* eslint-env es6, browser, node */

import React, { Component } from 'react';
import { Spinner } from 'components';

const asyncComponent = getComponent => class AsyncComponent extends Component {
  static Component = null;

  mounted = false;

  state = {
    Component: AsyncComponent.Component
  };

  componentDidMount() {
    this.mounted = true;
    document.documentElement.scrollTop = 0;
    if (this.state.Component === null) {
      getComponent().then(m => m.default).then(Component => {
        AsyncComponent.Component = Component;
        if (this.mounted) {
          this.setState({ Component });
        }
      });
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    const { Component } = this.state;

    return Component ? <Component {...this.props} />
                     : <Spinner />;
  }
};

const Profile = asyncComponent(() => System.import('./Profile'));
const Login = asyncComponent(() => System.import('./Login'));
// const Signup = asyncComponent(() => System.import('./Signup'));

export default {
  Profile,
  Login
  // Signup
};
