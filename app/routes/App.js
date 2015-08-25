import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from '../components/Header';
import { fetchProfile, logout } from '../actions/auth';

@connect(state => ({
  router: state.router,
  profile: state.auth
}))
export default class App extends React.Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    dispatch: PropTypes.func.isRequired,
    error: PropTypes.string,
    profile: PropTypes.object.isRequired
  }

  static contextTypes = {
    router: PropTypes.object
  }

  static fillStore(redux) {
    return redux.dispatch(fetchProfile());
  }

  render() {
    const {
      dispatch,
      profile
    } = this.props;

    return (
      <div>
        <Header
          profile={profile}
          router={this.context.router}
          {...bindActionCreators({ logout }, dispatch)}
        />

        {this.props.children}
      </div>
    );
  }
}
