import React, { PropTypes } from 'react';
import marked from 'marked';

export default class PostEditor extends React.Component {
  static propTypes = {
    onPublish: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    post: PropTypes.object
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      post: {
        ...newProps.post
      }
    });
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
    const { title, content } = this.state.post;

    return (
      <div className="row">
        <div className="col-sm-6">
          <div className="form-group">
            <input
              className="form-control"
              value={title}
              onChange={this.handleChange('title')}
              type="text"
              placeholder="Post title"
            />
          </div>

          <div className="form-group">
            <textarea
              className="post-contents form-control"
              onChange={this.handleChange('content')}
              value={content}
              placeholder="Content goes here"
              rows="20"
            />
          </div>

          <div className="form-group text-right">
            <button
              className="btn btn-lg btn-primary margin-left-15"
              onClick={this.handleSave}
            >Save</button>

            <button
              className="btn btn-lg btn-success margin-left-15"
              onClick={this.handlePublish}
            >Publish</button>
          </div>
        </div>

        <div className="col-sm-6">
          <h1>{title}</h1>

          <div
            dangerouslySetInnerHTML={{
              __html: marked(content || '', {
                sanitize: true,
                smartypants: true
              })
            }}
          />
        </div>
      </div>
    );
  }
}
