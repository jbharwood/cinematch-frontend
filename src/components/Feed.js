import React from 'react'
import {connect} from 'react-redux'
import { ActionCableConsumer } from 'react-actioncable-provider'
import PostForm from './PostForm'
import PostList from './PostList'
import adapter from '../services/adapter'

class Feed extends React.Component {
  state = {
    displayedPosts: [],
    newPosts: []
  }

  componentDidMount() {
    this.fetchPosts()
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

  render() {
    console.log("feed: ", this.state)

    return (
      <div className="Feed">
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

export default Feed
