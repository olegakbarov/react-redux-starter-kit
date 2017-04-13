/* eslint-env browser, node */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from 'components/Spinner';

// import qs from 'qs';
// import axios from 'axios';
// import ActionTypes from 'constants';

// import {
//   logout,
//   updateProfile
// } from 'actions';

class Profile extends Component {
  // constructor(props) {
  //   super(props);
  //   this.logout = this.logout.bind(this);
  //   this.updateProfile = this.updateProfile.bind(this);
  // }
  //
  // componentDidMount() {
  //   const { dispatch } = this.props;
  //   let res = window.location.hash.replace('#', '');
  //   const { access_token } = qs.parse(res);
  //
  //   if (access_token) {
  //     dispatch({ type: ActionTypes.FACEBOOK_AUTH_START });
  //
  //     axios.post('http://localhost:7010/api/v2/auth/oauth_facebook', {
  //       access_token: access_token
  //     }).then(result => {
  //       if (result.status === 200) {
  //         dispatch({
  //           type: ActionTypes.FACEBOOK_AUTH_SUCCESS,
  //           payload: result.data.body
  //         });
  //       }
  //     }).catch(err => {
  //       dispatch({
  //         type: ActionTypes.FACEBOOK_AUTH_FAIL,
  //         err
  //       });
  //     });
  //   }
  // }
  //
  // handleFacebookAuth = () => {
  //   const REDIRECT_PATH = 'http://localhost:8080/profile';
  //
  //   window.location = 'https://www.facebook.com/v2.8/dialog/oauth?' +
  //                     'client_id=230796810679252' +
  //                     '&response_type=token' +
  //                     `&redirect_uri=${REDIRECT_PATH}`;
  // }
  //
  // logout() {
  //   this.props.dispatch(logout());
  // }
  //
  // updateProfile(user) {
  //   this.props.dispatch(updateProfile(user));
  // }

  render() {
    // const { profile } = this.props;

    return (
      <div>Profile</div>
    );

    // if (profile) {
    //   return (<ProfileContent
    //             handleFacebookAuth={this.handleFacebookAuth}
    //             updateProfile={this.updateProfile}
    //             logout={this.logout}
    //             profile={profile}
    //           />);
    // } else {
    //   return <Spinner />;
    // }
  }
}

function select(state) {
  return {
    profile: state.auth.profile
  };
}

export default connect(select)(Profile);
