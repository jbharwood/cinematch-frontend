import React from 'react'
import {connect} from 'react-redux'
import { ActionCableConsumer } from 'react-actioncable-provider'
import PostForm from './PostForm'
import PostList from './PostList'
import MovieView from './MovieView'
import Watchlist from './Watchlist'
import adapter from '../services/adapter'


class Feed extends React.Component {
  state = {
    displayedPosts: [],
    newPosts: [],
    users: [],
    clickedUserID: null,
    clickedUsername: null,
    realUsers: null
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
          ...prevState.newPosts
          // ...prevState.newPosts.reverse()
        ],
        newPosts: []
      }
    })
  }

  fetchPosts = () => {
    fetch(`https://cinematch-jbharwood.herokuapp.com/posts`)
    .then(r => r.json())
    .then(r => {
      this.setState({
        newPosts: r.reverse()
      }, this.fetchFeedUsers)
    })
  }

  // fetchPost = (post) => {
  //   fetch(`https://cinematch-jbharwood.herokuapp.com/posts/${post.id}`)
  //   .then(r => r.json())
  //   .then(r => {
  //     this.setState({
  //       newPosts: [r, ...this.state.newPosts]
  //     })
  //   })
  // }

  fromChatbox = () => {
    return "hi i'm from chatbox"
  }

  fetchFeedUsers = () => {
    fetch(`https://cinematch-jbharwood.herokuapp.com/feed_users`)
    .then(r => r.json())
    .then(r => {
      const flags = new Set();
      const uniqueUsernames = r.filter(post => {
      if (flags.has(post.username)) {
        return false;
      }
      flags.add(post.username);
      return true;
      });
        this.setState({users: uniqueUsernames})
    })
  }

  fetchUsers = () => {
    fetch(`https://cinematch-jbharwood.herokuapp.com/users`)
    .then(r => r.json())
    .then(r => {
      this.setState({realUsers: r})
    })
  }
  //
  // fetchFeedUsers = () => {
  //   fetch(`https://cinematch-jbharwood.herokuapp.com/feeds/1`)
  //   .then(r => r.json())
  //   .then(r => {
  //     const flags = new Set();
  //     const uniqueUsernames = r.users.filter(post => {
  //       if (flags.has(post.username)) {
  //         return false;
  //       }
  //       flags.add(post.username);
  //       return true;
  //   });
  //     this.setState({users: uniqueUsernames})
  //   })
  // }

  handleUserWatchlist = (e) => {
    let username = e.target.innerText.substring(1)
    let clickedUser = this.state.realUsers.find(u => u.username === username)
    this.setState({clickedUserID: clickedUser.id, clickedUsername: e.target.innerText})
    this.props.dispatch({type: "CHANGE_CHATBOX_PAGE", payload: "Watchlist"})
  }

  renderUsers = () => {
    if (this.state.users.length > 0) {
      return this.state.users.map(u => {
        return (
          <div className="underline" style={{ cursor: 'pointer' }} onClick={this.handleUserWatchlist} id={u.id}>
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
    } else if (this.props.chatboxPage === "Watchlist" && this.state.clickedUserID !== null) {
      return <Watchlist clickedUserID={this.state.clickedUserID} clickedUsername={this.state.clickedUsername}/>
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
                this.fetchPosts()
              }}
            />
            <section id="new-message">
              <PostForm addPost={this.addPost}
                fetchPosts={this.fetchPosts}/>
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
    document.querySelector("main").scrollTo(0,0)
    //this.props.dispatch({type: "HIDE_APP", payload: true})
    this.props.dispatch({type: "CHANGE_CHATBOX_PAGE", payload: "Chatbox"})
    this.fetchPosts()
    this.fetchUsers()
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
    chatboxPage: state.chatboxPage,
    user: state.user,
    users: state.users
  }
}

export default connect(mapStateToProps)(Feed)
