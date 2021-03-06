import React from 'react'
import Post from './Post';
// import NewPostInfo from './NewPostInfo';

const PostList = ({ posts, newPostCount, handleDisplayPosts }) => {
  const postList = () => {
    return posts.map(post => {
      return <Post key={post.id} post={post} />
    })
  }

  return (
    <div>
      <div className="ui feed">
        {postList()}
      </div>
    </div>
  );
};

export default PostList;
