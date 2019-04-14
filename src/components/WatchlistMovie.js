import React from "react";
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'

class WatchlistMovie extends React.Component {

  state = {
    watched: false
  }

  handleRemoveMovie = () => {
    this.props.changeList(this.props.movie.id)
    fetch(`http://localhost:3000/watchlists/${this.props.movie.id}`, {
      method: "DELETE"
    })
  }

  handleWatchedMovie = () => {
    this.props.changeList(this.props.movie.id)
    fetch(`http://localhost:3000/watchlists/${this.props.movie.id}`, {
      method: "PATCH",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        watched: true,
      })
    }).then(r=>r.json())
    .then(r => {
    })
  }

  handleViewMovie = () => {
    this.props.dispatch({type: "VIEW_MOVIE", payload: this.props.movie})
    this.props.changeViewMovie()
  }

  renderWatchButton = () => {
    if (this.props.filtered === true) {
      return null
    } else {
      return <button onClick={this.handleWatchedMovie}> Watched </button>
    }
  }

  renderPage = () => {
    if (!!this.props.clickedUserID) {
      return (
        <div>
          {this.props.movie.title} <br/>
          <img src={this.props.movie.poster} alt="poster" width="50" height="50"/> <br/>
          <button onClick={this.handleViewMovie}> View Info</button>
        </div>
      )
    } else {
      return (
        <div>
          {this.props.movie.title} <br/>
          <img src={this.props.movie.poster} alt="poster" width="50" height="50"/> <br/>
          <button onClick={this.handleViewMovie}> View Info</button>
          {this.renderWatchButton()}
          <button onClick={this.handleRemoveMovie}> Remove </button>
        </div>
      )
    }
  }

  render() {
    return (
      <div className="watchlistMovie">
        {this.renderPage()}
      </div>
    )
  }

}
export default connect(null)(WatchlistMovie)
