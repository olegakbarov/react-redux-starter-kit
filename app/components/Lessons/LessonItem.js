import React, { PropTypes } from 'react';
import EditLesson from './EditLesson';

export default class LessonItem extends React.Component {
  static propTypes = {
    deleteLesson: PropTypes.func.isRequired,
    lesson: PropTypes.object.isRequired,
    updateLesson: PropTypes.func.isRequired
  }
  state = {
    modalIsOpened: false
  }
  _deleteLesson = () => {
    this.props.deleteLesson(this.props.lesson.id);
  }
  toggleModalState = () => {
    this.setState({
      modalIsOpened: !this.state.modalIsOpened
    });
  }
  render() {
    const lesson = this.props.lesson;
    return (
        <tr>
          <td>
            <h5>{lesson.subject}</h5>
            <small>{lesson.description}</small>
          </td>
          <td><h5>{lesson.price}</h5></td>
          <td>
            <EditLesson
              lesson={this.props.lesson}
              updateLesson={this.props.updateLesson}
              modalIsOpened={this.state.modalIsOpened}
              toggleModalState={this.toggleModalState}
             />
          </td>
          <td>
            <button
              className="btn btn-danger btn-small"
              onClick={this._deleteLesson}
            >Delete</button>
          </td>
        </tr>
    );
  }
}
