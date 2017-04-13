/* eslint-env node, browser */

import React, { Component } from 'react';
import views from './views';
// import { Match, Miss } from 'react-router';

  // static propTypes = {
  //   action: PropTypes.oneOf(['PUSH', 'REPLACE', 'POP']).isRequired,
  //   location: PropTypes.shape({
  //     pathname: PropTypes.string.isRequired,
  //     search: PropTypes.string.isRequired,
  //     hash: PropTypes.string.isRequired,
  //     state: PropTypes.any,
  //     key: PropTypes.string
  //   }).isRequired,
  //   router: PropTypes.object.isRequired,
  //   store: PropTypes.object.isRequired
  // };

export default class PublicLayout extends Component {
  // componentWillUpdate(nextProps) {
  //   const { router, location }= this.props;
  //   this.scrollPositions[router.createHref(location)] = [
  //     window.pageXOffset,
  //     window.pageYOffset
  //   ];
  //
  //   if (nextProps.action === 'PUSH') {
  //     window.scroll(0,0);
  //   }
  // }
  //
  // componentDidUpdate() {
  //   const { action, router, location } = this.props;
  //   if (action === 'POP') {
  //     const href = router.createHref(location);
  //     if (this.scrollPositions[href]) {
  //       window.scroll.apply(window, this.scrollPositions[href]);
  //     }
  //   }
  // }

  render() {
    const {
      Login
    } = views;
    return (
      <div className="wrapper">
        <Login />
      </div>
    );
  }
}
