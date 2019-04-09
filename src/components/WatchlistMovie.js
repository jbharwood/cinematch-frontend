import React from "react";
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'

class WatchlistMovie extends React.Component {

  state = {
    watched: false
  }

  handleWatchMovie = () => {
    this.props.changeList(this.props.movie.id)
    fetch(`http://localhost:3000/watchlists/${this.props.movie.id}`, {
      method: "DELETE"
    })
  }

  handleViewMovie = () => {
    this.props.dispatch({type: "VIEW_MOVIE", payload: this.props.movie})
    this.props.changeViewMovie()
  }

  render() {
    return (
      <div>
        {this.props.movie.title} <br/>
        <img src={this.props.movie.poster} alt="poster" width="50" height="50"/> <br/>
        <button onClick={this.handleViewMovie}> View Movie Info</button>
        <button onClick={this.handleWatchMovie}> Remove Movie</button>
      </div>
    )
  }

}
export default connect(null)(WatchlistMovie)
