import React, { PropTypes } from 'react';
import AddLessonModal from './AddLessonModal';

export default class AddLessonWidget extends React.Component {
  static propTypes = {
    addLesson: PropTypes.func.isRequired
  }
  state = {
    modalIsOpened: false
  }
  toggleModalState = () => {
    this.setState({
      modalIsOpened: !this.state.modalIsOpened
    });
  }
  _addLesson = (lesson) => {
    this.props.addLesson(lesson);
  }
  render() {
    return  (
      <div>
        <a className="btn btn-success btn-lg btn-requrest"
          onClick={this.toggleModalState}>Create a lesson
        </a>
        <AddLessonModal
          modalState={this.state.modalIsOpened}
          addLesson={this._addLesson}
          toggleModalState={this.toggleModalState}
        />
      </div>
    );
  }
}
