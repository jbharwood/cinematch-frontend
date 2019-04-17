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
      <div className="listMovie" style={{ cursor: 'pointer' }} onClick={this.handleViewMovie}>
        {this.props.movie.title} <br/>
        <img src={"http://image.tmdb.org/t/p/w185/" + this.props.movie.poster_path} alt="poster" width="100" height="100"/> <br/>
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
