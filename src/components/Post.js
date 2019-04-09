import React from 'react'
import adapter from '../services/adapter'

const Post = ({ post }) => {
  return (
    <div className="event">
      <div className="ui card">
        <div className="content">
        <div className="summary">{post.user.username}: {post.content}</div>
          <div className="meta">
            <a
            href="/"
            className="like"
            onClick={(e) => {
              e.preventDefault()
            }}
            >
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;

// <div className="summary">{post.user.username}: {post.content}</div>
