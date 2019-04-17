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

  renderPage = () => {
    return (
      <div>
        {this.props.movie.title} <br/>
        <img src={"http://image.tmdb.org/t/p/w185/" + this.props.movie.poster_path} alt="poster" width="50" height="50"/> <br/>
        <Button variant="contained" color="primary" onClick={this.handleViewMovie}> View Info</Button>
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
