import React, { PropTypes } from 'react';
import Icon from 'react-evil-icons';
import Modal from 'react-modal';
import LinkedStateMixin from 'react/lib/LinkedStateMixin';
import reactMixin from 'react-mixin';

@reactMixin.decorate(LinkedStateMixin)
export default class AddLessonModal extends React.Component {
  static propTypes = {
    addLesson: PropTypes.func.isRequired,
    modalState: PropTypes.bool.isRequired,
    toggleModalState: PropTypes.func.isRequired
  }
  state = {
    subject: null,
    tags: null,
    price: null,
    description: null
  }
  _onSubmit = (event) => {
    event.preventDefault();
    this.props.addLesson(this.state);
    this.props.toggleModalState();
  }
  render() {
    return (
      <Modal
        isOpen={this.props.modalState}
        onRequestClose={this.props.toggleModalState}
      >
      <div>
        <h2 className="modal__title">Add lesson</h2>

        <span className="modal-close" onClick={this.props.toggleModalState}>
          <Icon name="ei-close" size="s" />
        </span>

          <div className="form-group">
            <label htmlFor="Subject">Subject</label>
            <input
              className="form-control"
              id="subject"
              type="text"
              valueLink={this.linkState('subject')}
              placeholder="subject"
            />
          </div>

          <div className="form-group">
            <label htmlFor="Tags">Tags</label>
            <input
              className="form-control"
              id="tags"
              type="text"
              valueLink={this.linkState('tags')}
              placeholder="tags"
            />
          </div>

          <div className="form-group">
            <label htmlFor="Price">Price</label>
            <input
              className="form-control"
              id="price"
              type="number"
              valueLink={this.linkState('price')}
              placeholder="price"
            />
          </div>

          <div className="form-group">
            <label htmlFor="Description">Description</label>
            <input
              className="form-control"
              id="description"
              type="description"
              valueLink={this.linkState('description')}
              placeholder="description"
            />
          </div>

          <button
            className="btn btn-success btn-lg margin-top-20 pull-right"
            onClick={this._onSubmit}>
            Create a lesson
          </button>
        </div>
      </Modal>
    );
  }
}
