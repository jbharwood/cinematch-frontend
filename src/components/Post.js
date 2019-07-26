import React from 'react'
import adapter from '../services/adapter'
import {connect} from 'react-redux'

const Post = (props) => {

  const handlePost = (post) => {
    if (!!props.post.content && props.post.content.search("http") === 0) {
      return (
        <div>
          <img style={{ cursor: 'pointer' }} className="picture" src={props.post.content} onClick={handleClick} alt="poster" width="50" height="50"/>
        </div>
      )
    } else {
      return props.post.content
    }
  }

  const handleClick = (post) => {
    props.dispatch({type: "VIEW_MOVIE", payload: props.post})
    props.dispatch({type: "CHANGE_CHATBOX_PAGE", payload: "MovieView"})
  }

  const componentDidUpdate = () => {
    const objDiv = document.getElementById('div');
    objDiv.scrollTop = objDiv.scrollHeight;
  }

  return (
    <div className="event">
      <div className="ui card">
        <div className="content">
        <div className="summary">
          <h3>{props.post.user.username}: {handlePost(props.post)}</h3>
          <p>{props.post.date}</p>
          </div>
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
