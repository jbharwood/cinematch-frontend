import React from "react";

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

  render() {
    return (
      <div>
        {this.props.movie.title} <br/>
        <img src={this.props.movie.poster} alt="poster" width="50" height="50"/> <br/>
        <button onClick={this.handleWatchMovie} id={this.props.movie.id}> Watched Movie </button>
      </div>
    )
  }
}
export default WatchlistMovie
