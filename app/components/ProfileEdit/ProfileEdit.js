import styles from './styles.styl';

import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';

@CSSModules(styles)
export default class ProfileEdit extends React.Component {
  static propTypes = {
    profile: PropTypes.object,
    saveProfile: PropTypes.func.isRequired
  }

  state = {
    profile: { ...this.props.profile }
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.saveProfile(this.state.profile);
  }

  handleChange = field => e => {
    e.preventDefault();

    this.setState({
      profile: {
        ...this.state.profile,
        [field] : e.target.value
      }
    });
  }

  render() {
    const { firstname, lastname } = this.state.profile;

    return (
      <form
        styleName="wrapper"
        onSubmit={this.handleSubmit}
      >
        <div styleName="panel">
          <div styleName="title">Basic info</div>

            <label htmlFor="firstname">First name</label>

            <input
              styleName="input-title"
              value={firstname}
              onChange={this.handleChange('firstname')}
              id="firstname"
              type="text"
              placeholder="First name"
            />

            <label htmlFor="lastname">Last name</label>

            <input
              styleName="input-title"
              value={lastname}
              onChange={this.handleChange('lastname')}
              id="lastname"
              type="text"
              placeholder="Last name"
            />

          <button
            styleName="btn"
            type="submit"
          >
           Save
          </button>

        </div>
      </form>
    );
  }
}
