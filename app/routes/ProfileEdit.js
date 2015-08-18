import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import LinkedStateMixin from 'react/lib/LinkedStateMixin';
import reactMixin from 'react-mixin';
import { saveProfile } from '../actions/auth';

@connect(state => ({
  username: state.auth.username,
  users: state.users
}))
@reactMixin.decorate(LinkedStateMixin)
export default class ProfileEdit extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);

    this.state = this._getProfileState(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this._getProfileState(nextProps));
  }

  _onSubmit(event) {
    this.props.dispatch(saveProfile(this.state));

    event.preventDefault();
  }

  _getProfileState({ users, username }) {
    if (!users || !username || !users[username]) { return {}; }

    return { ...users[username] };
  }

  render() {
    return (
      <form
        className="container-fluid content-wrapper"
        onSubmit={::this._onSubmit}
      >
        <div className="row">
          <div className="col-xs-12">
            <div className="panel panel-default">
              <div className="panel-body">
                <h4>Basic info</h4>

                <div className="form-group">
                  <label htmlFor="username">Username</label>

                  <input
                    className="form-control"
                    id="username"
                    type="text"
                    valueLink={this.linkState('username')}
                    placeholder="username"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="firstname">First name</label>

                  <input
                    className="form-control"
                    id="firstname"
                    type="text"
                    valueLink={this.linkState('firstname')}
                    placeholder="First name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="lastname">Last name</label>

                  <input
                    className="form-control"
                    id="lastname"
                    type="text"
                    valueLink={this.linkState('lastname')}
                    placeholder="Last name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="shortDescription">Im a ...</label>

                  <input
                    className="form-control"
                    id="shortDescription"
                    type="text"
                    valueLink={this.linkState('shortDescription')}
                    placeholder="I am a ... (in one word)"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="city">City</label>

                  <input
                    className="form-control"
                    id="city"
                    type="text"
                    valueLink={this.linkState('city')}
                    placeholder="City"
                  />
                </div>

                  <h4>Experience</h4>

                  <textarea
                    className="aboutMe form-control"
                    valueLink={this.linkState('longDescription')}
                    rows="6"
                    placeholder="tell a few words about projects
                      you've participated in, or jobs used to work"
                  />

                <button
                  className="btn btn-primary btn-lg pull-right margin-top-20"
                  type="submit">Save
                </button>

              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }
}
