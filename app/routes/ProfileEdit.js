import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { saveProfile } from '../actions/auth';

@connect(state => ({
  username: state.auth.username,
  users: state.users
}))
export default class ProfileEdit extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this.getProfileState(nextProps));
  }

  state = this.getProfileState(this.props)

  getProfileState({ users, username }) {
    if (!users || !username || !users[username]) { return {}; }

    return { ...users[username] };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.dispatch(saveProfile(this.state));
  }

  handleChange = field => e => {
    e.preventDefault();
    this.setState({ [field] : e.target.value });
  }

  render() {
    const { username, firstname, lastname } = this.state;
    return (
      <form
        className="container-fluid content-wrapper"
        onSubmit={this.handleSubmit}
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
                    value={username}
                    onChange={this.handleChange('username')}
                    id="username"
                    type="text"
                    placeholder="username"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="firstname">First name</label>

                  <input
                    className="form-control"
                    value={firstname}
                    onChange={this.handleChange('firstname')}
                    id="firstname"
                    type="text"
                    placeholder="First name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="lastname">Last name</label>

                  <input
                    className="form-control"
                    value={lastname}
                    onChange={this.handleChange('lastname')}
                    id="lastname"
                    type="text"
                    placeholder="Last name"
                  />
                </div>

                <button
                  className="btn btn-primary btn-lg pull-right margin-top-20"
                  type="submit"
                >
                Save
                </button>

              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }
}
