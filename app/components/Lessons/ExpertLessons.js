import React, { PropTypes } from 'react';
import AddLessonWidget from './AddLessonWidget';
import LessonItem from './LessonItem';
import Calendar from '../Calendar';

export default class ExpertLessons extends React.Component {
  static propTypes = {
    addLesson: PropTypes.func.isRequired,
    deleteLesson: PropTypes.func.isRequired,
    lessons: PropTypes.array.isRequired,
    updateLesson: PropTypes.func.isRequired
  }
  render() {
    let lessons = this.props.lessons;
    if (!lessons) {
      return <div>You have no lessons.</div>;
    } else {
      const list = lessons.map(lesson =>
        <LessonItem
          lesson={lesson}
          updateLesson={this.props.updateLesson}
          deleteLesson={this.props.deleteLesson}
         />
      );

      return  (
        <div className="container-fluid content-wrapper">
          <div className="row">
            <div className="col-xs-12 col-sm-8">
              <table
              className="table table-striped table-hover
                         panel panel-default panel-body">
                <tbody>
                  {list}
                </tbody>
              </table>
              <AddLessonWidget
                addLesson={this.props.addLesson}
               />
            </div>
            <div className="col-xs-12 col-sm-4">
              <Calendar />
            </div>
          </div>
        </div>
      );
    }
  }
}
