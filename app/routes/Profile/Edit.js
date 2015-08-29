import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { saveProfile } from '../../actions/auth';
import ProfileEdit from '../../components/ProfileEdit';

@connect(state => ({
  auth: state.auth
}))
export default class ProfileEditContainer extends React.Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  }
  saveProfile = (profile) => {
    this.props.dispatch(saveProfile(profile));
  }
  render() {
    if (this.props.auth.profile) {
      const { profile } = this.props.auth;
      return <ProfileEdit profile={profile} saveProfile={this.saveProfile} />;
    } else {
      return <div></div>;
    }
  }
}
