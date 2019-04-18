import React from "react";
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import Button from '@material-ui/core/Button';

class ListMovie extends React.Component {

  state = {
    watched: false
  }

  handleViewMovie = () => {
    this.props.dispatch({type: "VIEW_MOVIE", payload: this.props.movie})
    this.props.changeViewMovie()
  }

  renderGenre = () => {
    let arr = []
    for (var i = 0; i < this.props.genres.length; i++) {
      for (var x = 0; x < this.props.movie.genre_ids.length; x++) {
        if (this.props.genres[i].id === this.props.movie.genre_ids[x]) {
          arr.push(this.props.genres[i].name)
        }
      }
    }
    return <div> <h3> {arr.join(", ")} </h3> </div>
  }

  renderPage = () => {
    return (
      <div className="listMovie" style={{ cursor: 'pointer' }} onClick={this.handleViewMovie}>
        <h2>IMDB Rating: {this.props.movie.vote_average}</h2>
        <h2>{this.props.movie.title}</h2>
        <h3>{this.props.movie.release_date.slice(0,4)}</h3>
        <img src={"http://image.tmdb.org/t/p/w185/" + this.props.movie.poster_path} alt="poster" width="100" height="100"/> <br/>
        {this.renderGenre()}
      </div>
    )
  }

  render() {
    return (
      <div className="watchlistMovie">
        {this.renderPage()}
      </div>
    )
  }

}
export default connect(null)(ListMovie)
