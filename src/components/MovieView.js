import React from 'react'
import {connect} from 'react-redux'

class MovieView extends React.Component {

  state = {
    movie: null,
    badData: false
  }

  fetchMovieInfo = () => {
    let id = this.props.viewMovie.imdbID
    // let id = this.props.viewMovie.imdbID.slice(0, -1)
    fetch(`https://api.themoviedb.org/3/find/${id}?api_key=3eb68659d6134fa388c1a0220feb7fd1&external_source=imdb_id`)
    .then(r => r.json())
    .then(r => {
      if (r.movie_results.length !== 0) {
        this.setState({movie: r.movie_results[0]})
      } else if (r.tv_results.length !== 0) {
        this.setState({movie: r.tv_results[0]})
      } else {
        this.setState({badData: true})
      }
    })
  }

  handleFetch = () => {
    if (this.props.viewMovie !== null) {
      this.fetchMovieInfo()
      // this.props.dispatch({ type: "FETCH_MOVIE", payload: this.props.viewMovie })

    } else {
      return null
    }
  }

  handleWatchlist = () => {
    this.postToWatchlist(this.props.viewMovie)
  }

  postToWatchlist = (movie) => {
    debugger
    fetch(`http://localhost:3000/watchlists`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: movie.Title,
        omdb_id: this.state.movie.id,
        imdb_id: movie.imdbID,
        user_id: this.props.user
      })
    })
    .then(r=>r.json())
    .then(r=> {
    })
  }

  renderMoviePage = () => {
    if (this.state.movie !== null) {
      if (this.state.movie.name !== undefined) {
        return (
          <div>
            <p>{this.state.movie.name}</p>
            <p>{this.state.movie.first_air_date}</p>
            <p>{this.state.movie.overview}</p>
            <button onClick={this.handleWatchlist}> Add to Watchlist </button>
          </div>
        )
      }
      return (
        <div>
          <p>{this.state.movie.title}</p>
          <p>{this.state.movie.release_date}</p>
          <p>{this.state.movie.overview}</p>
          <button onClick={this.handleWatchlist}> Add to Watchlist </button>
        </div>
      )
    } if (this.state.badData === true) {
        return "Movie Not Found"
      } else {
        return null
      }
  }

  render() {
    return (
      <div className="movieView">
        <h3>Selected Movie</h3>
        {this.handleFetch()}
        {this.renderMoviePage()}
      </div>
    )
  }

}

function mapStateToProps(state){
  return {
    viewMovie: state.viewMovie,
    user: state.user,
    movie: state.movieInfo
  }
}

export default connect(mapStateToProps)(MovieView)
