/* eslint-env node, browser */

import React, { PropTypes, Component } from 'react';

// import Notif from 'views/Notif';
// import Header from 'views/Header';
// import views from './views';

import { Match, Miss } from 'react-router';
import { connect } from 'react-redux';
import { fetchProfile } from './actions';

// type Location = {
//   pathname: string,
//   search: string,
//   hash: isRequired,
//   state: any,
//   key: string
// }
//
//     action: PropTypes.oneOf(['PUSH', 'REPLACE', 'POP']).isRequired,
//     location: PropTypes.shape({
//     }).isRequired,
//     router: PropTypes.object.isRequired,
//     store: PropTypes.object.isRequired


export default class AuthorizedLayout extends Component {
  // componentWillUpdate(nextProps) {
  //   const { router, location }= this.props;
  //   this.scrollPositions[router.createHref(location)] = [window.pageXOffset, window.pageYOffset]; //eslint-disable-line
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
    return (
      <div className="wrapper">

        {/* <Notif />

        <Header /> */}

        AuthorizedLayout

        {/* <div className="content">
          <Match
            pattern="/profile"
            component={views.Profile}
          />

          <Miss component={views.NotFound} /> */}

        {/* </div> */}
      </div>
    );
  }
}

// function select(state) {
//   return {
//     auth: state.auth
//   };
// }
//
// export default connect(select)(AuthorizedLayout);
