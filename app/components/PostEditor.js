import React, { PropTypes } from 'react';
import { Link } from 'react-router';
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
    const parsedContent = marked(content || '', {
      sanitize: true,
      smartypants: true
    });
    return (
      <div>
        <div className="col-sm-6">
          <div className="from-group">

            <input
              className="form-control"
              value={title}
              onChange={this.handleChange('title')}
              type="text"
              placeholder="Post title"
            />

            <textarea
              className="post-contents form-control margin-top-20"
              onChange={this.handleChange('content')}
              value={content}
              placeholder="Content goes here"
              rows="20"
            />
            <br />
            <div className="margin-top-20">
                <Link to={'/dashboard'}>
                  <button
                    className="btn btn-default"
                  >
                  Dasboard
                  </button>
                </Link>

                <button
                  className="btn btn-default margin-left-15"
                  onClick={this.handleSave}
                >Save draft </button>
                {<span> </span>}
                <button
                  className="btn btn-default margin-left-15"
                  onClick={this.handlePublish}
                >Publish</button>
            </div>
          </div>
        </div>

        <div className="col-sm-6">
        <div>
          <h1>{title}</h1>
          <div
            dangerouslySetInnerHTML={{ __html: parsedContent }}>
          </div>
        </div>
        </div>
      </div>
    );
  }
}
