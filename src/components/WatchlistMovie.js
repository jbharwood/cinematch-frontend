import React from "react";
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import Button from '@material-ui/core/Button';
import API_URL from '../config.js'

class WatchlistMovie extends React.Component {

  state = {
    watched: false
  }

  handleRemoveMovie = () => {
    this.props.changeList(this.props.movie.id)
    fetch(`${API_URL}/watchlists/${this.props.movie.id}`, {
      method: "DELETE"
    })
  }

  handleWatchedMovie = () => {
    this.props.changeList(this.props.movie.id)
    fetch(`${API_URL}/watchlists/${this.props.movie.id}`, {
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
      return <Button variant="contained" color="primary" onClick={this.handleWatchedMovie}> Watched </Button>
    }
  }

  renderPage = () => {
    if (!!this.props.clickedUserID) {
      return (
        <div style={{ cursor: 'pointer' }} onClick={this.handleViewMovie}>
          {this.props.movie.title} <br/>
          <img src={this.props.movie.poster} alt="poster" width="50" height="50"/> <br/>
        </div>
      )
    } else {
      return (
        <div>
        <div style={{ cursor: 'pointer' }} onClick={this.handleViewMovie}>
          {this.props.movie.title} <br/>
          <img src={this.props.movie.poster} alt="poster" width="50" height="50"/> <br/>
        </div>
        <div class="divider"/>
          {this.renderWatchButton()}
        <div class="divider"/>
          <Button variant="contained" color="primary" onClick={this.handleRemoveMovie}> Remove </Button>
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
