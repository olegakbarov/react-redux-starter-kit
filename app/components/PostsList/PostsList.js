import styles from './styles.styl';

import React, { PropTypes } from 'react';
import moment from 'moment';
import { Link } from 'react-router';
import CSSModules from 'react-css-modules';

@CSSModules(styles)
export default class PostsList extends React.Component {
  static propTypes = {
    posts: PropTypes.array
  }

  render() {
    return (
      <div styleName="wrapper">
        {this.props.posts
          .filter(item => item.published)
          .map(post => {
            const publishedAt = moment(new Date(post.date));

            return (
              <div key={post.id}>
                <Link to={`/posts/${post.id}`}>
                  <h2 className="post-header-link">{post.title}</h2>
                </Link>

                <small>{publishedAt.format('dddd, h:mm a')}</small>
              </div>
            );
          })}
      </div>
    );
  }
}
