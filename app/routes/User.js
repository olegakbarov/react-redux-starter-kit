import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Icon from 'react-evil-icons';
import Modal from 'react-modal';
import { fetchSingleUser } from '../actions/users';
import { fetchProfile } from '../actions/auth';
import { requestLesson } from '../actions/lessons';
import LessonModal from '../components/LessonModal';

Modal.setAppElement(document.getElementById('app')); //eslint-disable-line

@connect(state => ({
  users: state.users,
  auth: state.auth
}))
export default class User extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,
    users: PropTypes.object.isRequired
  }

  state = {
    messageModalIsOpen: false,
    lessonModalIsOpen: false
  }
  static fillStore(redux, nextState) {
    return Promise.all([
        redux.dispatch(fetchSingleUser(nextState.params.id)),
        redux.dispatch(fetchProfile())
      ]);
  }
  openLessonModal = () => {
    this.setState({ lessonModalIsOpen: true });
  }
  closeMessageModal = () => {
    this.setState({
      messageModalIsOpen: false
    });
  }
  closeLessonModal = () => {
    this.setState({
      lessonModalIsOpen: false
    });
  }
  requestLesson() {
    this.props.dispatch(requestLesson(this.props.params.id));
  }

  renderUserPic(url) {
    if (!url) {
      return (
        <Icon
          className="avatar-single-user avatar-no-image"
          name="ei-user"
          size="l"
        />
      );
    }

    return (
      <div className="avatar-single-user" style={{
        backgroundImage: `url(${url})`,
        backgroundSize: 'cover'
      }} />
    );
  }

  render() {
    const user = this.props.users[this.props.params.id];

    if (!user) {
      return <Icon name="ei-spinner-3" className="spinner-basic" size="m" />;
    }

    const {
      picture,
      firstname,
      lastname,
      city,
      shortDescription,
      longDescription
    } = user;
    const fullname = `${firstname} ${lastname}`;
    return (
      <div className="content-singleUser">

        <LessonModal
          fullname={fullname}
          close={this.closeLessonModal}
          isOpen={this.state.lessonModalIsOpen}
        />

        {this.renderUserPic(picture)}

        <div className="single-user-name">{firstname} {lastname}</div>
        <div className="single-user-spec">{shortDescription}</div>

        <div className="single-user-city">
          <Icon name="ei-location" size="s" /> {city}
        </div>

        <div className="single-user-buttons">
          <a className="btn btn-success btn-lg btn-requrest"
            onClick={this.openLessonModal}>Request</a>
        </div>

        <article className="single-user-about">{longDescription}</article>
        <p className="single-user-subtitle">feedback:</p>
        <div className="panel panel-default">
          <div className="panel-body">
            That was neat!
          </div>
        </div>
      </div>
    );
  }
}
