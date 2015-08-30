import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { saveProfile } from '../actions/auth';
import ProfileEdit from '../components/ProfileEdit';

@connect(state => ({
  auth: state.auth
}), {
  saveProfile
})
export default class Profile extends React.Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    saveProfile: PropTypes.func.isRequired
  }

  saveProfile = profile => this.props.saveProfile(profile)

  render() {
    const { auth: { profile } } = this.props;

    if (!profile) return null;

    return <ProfileEdit profile={profile} saveProfile={this.saveProfile} />;
  }
}
