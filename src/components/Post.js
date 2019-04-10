import React from 'react'
import adapter from '../services/adapter'

const handlePost = (post) => {
  if (!!post.content && post.content.search("http") === 0) {
    return (
      <img src={post.content} alt="poster" width="50" height="50"/>
    )
  } else {
    return post.content
  }
}

const Post = ({ post }) => {
  return (
    <div className="event">
      <div className="ui card">
        <div className="content">
        <div className="summary">{post.user.username}: {handlePost(post)}</div>
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
