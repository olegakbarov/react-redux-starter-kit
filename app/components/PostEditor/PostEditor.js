import './../../global.styl';
import styles from './styles.styl';

import React, { PropTypes } from 'react';
import marked from 'marked';
import CSSModules from 'react-css-modules';

@CSSModules(styles)
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
      <div styleName="wrapper">
        <div styleName="editor-container">
          <input
            styleName="input-title"
            value={title}
            onChange={this.handleChange('title')}
            type="text"
            placeholder="Post title"
          />

          <textarea
            styleName="input-text"
            onChange={this.handleChange('content')}
            value={content}
            placeholder="Content goes here"
            rows="20"
          />

          <div styleName="btn-container">
            <button
              styleName="btn"
              onClick={this.handleSave}
            >Save</button>

            <button
              styleName="btn"
              onClick={this.handlePublish}
            >Publish</button>
          </div>
        </div>

        <div styleName="post-container">
          <div styleName="title">{title}</div>

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
