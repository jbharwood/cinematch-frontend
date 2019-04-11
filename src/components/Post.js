import React from 'react'
import adapter from '../services/adapter'
import {connect} from 'react-redux'

const Post = (props) => {

  const handlePost = (post) => {
    if (!!props.post.content && props.post.content.search("http") === 0) {
      return (
        <img src={props.post.content} onClick={handleClick} alt="poster" width="50" height="50"/>
      )
    } else {
      return props.post.content
    }
  }

  const handleClick = (post) => {
    props.dispatch({type: "VIEW_MOVIE", payload: props.post})
    props.dispatch({type: "CHANGE_CHATBOX_PAGE", payload: "MovieView"})
  }

  return (
    <div className="event">
      <div className="ui card">
        <div className="content">
        <div className="summary">{props.post.user.username}: {handlePost(props.post)}</div>
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

function mapStateToProps(state) {
  return {
    search: state.search
  }
}

export default connect(mapStateToProps)(Post)
