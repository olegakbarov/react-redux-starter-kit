import React, { PropTypes } from 'react';
import UpdateLessonModal from './UpdateLessonModal';

export default class UpdateLesson extends React.Component {
  static propTypes = {
    editLesson: PropTypes.func.isRequired,
    lesson: PropTypes.object.isRequired,
    modalState: PropTypes.func.isRequired,
    toggleModalState: PropTypes.func.isRequired,
    updateLesson: PropTypes.func.isRequired
  }
  state = {
    modalState: false
  }
  toggleModalState = () => {
    this.setState({
      modalState: !this.state.modalState
    });
  }
  render() {
    return (
      <div>
        <UpdateLessonModal
          lesson={this.props.lesson}
          updateLesson={this.props.updateLesson}
          toggleModalState={this.toggleModalState}
          modalState={this.state.modalState}
        />
        <button
          className="btn btn-primary btn-small"
          onClick={this.toggleModalState}
        >Edit</button>
      </div>
    );
  }
}
