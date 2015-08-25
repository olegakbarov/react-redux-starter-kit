import React, { PropTypes } from 'react';

export default class ProfileEdit extends React.Component {
  static propTypes = {
    profile: PropTypes.obj,
    saveProfile: PropTypes.func.isRequired
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.saveProfile(this.state);
  }
  handleChange = field => e => {
    e.preventDefault();
    this.setState({ [field] : e.target.value });
  }
  render() {
    const { firstname, lastname } = this.props.profile;

    return (
      <form
        className="container-fluid content-profile"
        onSubmit={this.handleSubmit}
      >
        <div className="row">
          <div className="col-xs-12">
            <div className="panel panel-default">
              <div className="panel-body">
                <h4>Basic info</h4>

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
                  className="btn btn-default btn-block margin-top-20"
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
