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
    newPosts: [],
    users: []
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
        // newPosts: r.reverse().slice(0, 6)
        newPosts: r.reverse()
      }, this.fetchUsers)
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
    return "hi i'm from chatbox"
  }

  fetchUsers = () => {
    fetch(`http://localhost:3000/feeds/1`)
    .then(r => r.json())
    .then(r => {
      const flags = new Set();
      const uniqueUsernames = r.users.filter(post => {
        if (flags.has(post.username)) {
          return false;
        }
        flags.add(post.username);
        return true;
    });
      this.setState({users: uniqueUsernames})
    })
  }

  renderUsers = () => {
    if (this.state.users.length > 0) {
      return this.state.users.map(u => {
        return (
          <div>
            <br/>{u.username}
          </div>
        )
      })
    }
  }

  renderPage = () => {
    if (this.props.chatboxPage === "MovieView") {
      return <MovieView fromChatbox={this.fromChatbox}
        fetchPosts= {this.fetchPosts}/>
    } else {
      return (
        <div id="container">
          <aside id="sidebar">Users <br/>
            {this.renderUsers()}
          </aside>
          <section id="main">
            <ActionCableConsumer
              channel={{ channel: 'FeedChannel'}}
              onReceived={(post) => {
                this.fetchPost(post)
                console.log("msg recieved", post);
                // this.addPost(post)
              }}
            />
            <section id="new-message">
              <PostForm addPost={this.addPost} />
            </section>
            <section id="messages-list">
              <PostList
                posts={this.state.newPosts}
              />
            </section>
          </section>
        </div>
      )
    }
  }

  componentDidMount() {
    this.props.dispatch({type: "CHANGE_CHATBOX_PAGE", payload: "Chatbox"})
    this.fetchPosts()
  }

  render() {
    console.log("users in feed: ", this.props.users);
    return (
      <div className="Feed">
        {this.renderPage()}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    chatboxPage: state.chatboxPage,
    user: state.user,
    users: state.users
  }
}

export default connect(mapStateToProps)(Feed)
