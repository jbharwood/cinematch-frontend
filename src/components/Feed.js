import React from 'react'
import {connect} from 'react-redux'
import { ActionCableConsumer } from 'react-actioncable-provider'
import PostForm from './PostForm'
import PostList from './PostList'
import MovieView from './MovieView'
import adapter from '../services/adapter'

class Feed extends React.Component {
  state = {
    displayedPosts: [],
    newPosts: []
  }

  addPost = post => {
    this.setState(prevState => {
      return {
        newPosts: [...prevState.newPosts, post]
      }
    })
    // }, adapter.fetchFeed(1))
  }

  handleDisplayPosts = () => {
    this.setState(prevState => {
      return {
        displayedPosts: [
          ...prevState.displayedPosts,
          ...prevState.newPosts.reverse()
        ],
        newPosts: []
      }
    })
  }

  fetchPosts = () => {
    fetch(`http://localhost:3000/posts`)
    .then(r => r.json())
    .then(r => {
      this.setState({
        newPosts: r.reverse()
      })
    })
  }

  fetchPost = (post) => {
    fetch(`http://localhost:3000/posts/${post.id}`)
    .then(r => r.json())
    .then(r => {
      this.setState({
        newPosts: [r, ...this.state.newPosts]
      })
    })
  }

  fromChatbox = () => {
    return "hi"
  }

  renderPage = () => {
    if (this.props.chatboxPage === "MovieView") {
      return <MovieView fromChatbox={this.fromChatbox}/>
    } else {
      return (
        <div>
          <ActionCableConsumer
            channel={{ channel: 'FeedChannel'}}
            onReceived={(post) => {
              this.fetchPost(post)
              console.log("msg recieved", post);
              // this.addPost(post)
            }}
          />
          <PostForm addPost={this.addPost} />
          <PostList
            posts={this.state.newPosts}
          />
        </div>
      )
    }
  }


  componentDidMount() {
    this.props.dispatch({type: "CHANGE_CHATBOX_PAGE", payload: "Chatbox"})
    this.fetchPosts()
  }

  render() {
    return (
      <div className="Feed">
        {this.renderPage()}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    chatboxPage: state.chatboxPage
  }
}

export default connect(mapStateToProps)(Feed)
