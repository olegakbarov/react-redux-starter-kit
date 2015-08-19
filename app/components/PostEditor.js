import React, { PropTypes } from 'react';
import { Link } from 'react-router';

export default class PostEditor extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    onPublish: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    post: PropTypes.object
  }
  state = {
    post: { ...this.props.post }
  }
  handleSave = (e) => {
    e.preventDefault();
    this.props.onSave(this.state.post);
  }
  handlePublish = (e) => {
    e.preventDefault();
    this.props.onPublish(this.state.post);
  }
  handleChange = field => event => {
    this.setState({
      post: {
        ...this.state.post,
        [field]: event.target.value
      }
    });
  }
  render() {
    let { title, content, tags } = this.state.post;
    return (
      <div className="container-fluid content-wrapper">
      <div className="col-sm-6">
        <Link to={'/dashboard'}>
          <p>Back to dashboard</p>
        </Link>
        <div className="from-group">

          <label>Post title</label>
          <input
            className="form-control"
            value={title}
            onChange={this.handleChange('title')}
            type="text"
            placeholder="Post title"
          />
          <label>Content</label>
          <textarea
            className="post-contents form-control"
            onChange={this.handleChange('content')}
            value={content}
            placeholder="Content goes here"
            rows="20"
          />
          <label>Tags</label>
          <input
            className="form-control"
            onChange={this.handleChange('tags')}
            value={tags}
            type="text"
            placeholder="Tags"
          />
          <div className="margin-top-20 pull-right">
            <button
              className="btn btn-lg btn-primary"
              onClick={this.handleSave}
            >Save draft</button>
            <button
              className="btn btn-lg btn-success"
              onClick={this.handlePublish}
            >Publish</button>
          </div>
        </div>
      </div>

      <div className="col-sm-6">
      </div>

      </div>
    );
  }
}
