import React from 'react'
import {connect} from 'react-redux'
import SimilarMovie from './SimilarMovie'

class MovieView extends React.Component {

  state = {
    movie: null,
    badData: false,
    similarMovies: []
  }

  fetchMovieInfo = () => {
    let id = this.props.viewMovie.imdbID
    if (id.length > 9) {
      id = this.props.viewMovie.imdbID.slice(0, -1)
    }
    fetch(`https://api.themoviedb.org/3/find/${id}?api_key=3eb68659d6134fa388c1a0220feb7fd1&external_source=imdb_id`)
    .then(r => r.json())
    .then(r => {
      if (r.movie_results.length !== 0) {
        this.setState({movie: r.movie_results[0]}, this.fetchSimilarMovies)
      } else if (r.tv_results.length !== 0) {
        this.setState({movie: r.tv_results[0]}, this.fetchSimilarMovies)
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

  // handleSimilarMovies = () => {
  //   this.fetchSimilarMovies(this.state.movie.id)
  //   // return (
  //   //   <div>
  //   //     <p>{this.state.movie.name}</p>
  //   // )
  // }

  handleBack = () => {
    this.props.changePage()
  }

  fetchSimilarMovies = (omdbId) => {
    let id = this.state.movie.id
    fetch(`https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=3eb68659d6134fa388c1a0220feb7fd1&language=en-US&page=1`)
    .then(r => r.json())
    .then(r => {
      this.setState({similarMovies: r.results})
    })
  }

  renderSimilarMovies = () => {
    if (this.state.similarMovies.length > 0) {
      return this.state.similarMovies.map (m => {
        return <SimilarMovie result={m} changePage={this.props.changePage}/>
      })
    }
  }

  renderMoviePage = () => {
    if (this.state.movie !== null) {
      if (this.state.movie.name !== undefined) {
        return (
          <div>
            <p>{this.state.movie.name}</p>
            <p>{this.state.movie.first_air_date}</p>
            <img src={"http://image.tmdb.org/t/p/w185/" + this.state.movie.poster_path} alt="poster" width="50" height="50"/> <br/>
            <p>{this.state.movie.overview}</p>
            <button onClick={this.handleWatchlist}> Add to Watchlist </button>
            <button onClick={this.handleBack}> Go Back </button>
            {this.renderSimilarMovies()}
          </div>
        )
      }
      return (
        <div>
          <p>{this.state.movie.title}</p>
          <p>{this.state.movie.release_date}</p>
          <img src={"http://image.tmdb.org/t/p/w185/" + this.state.movie.poster_path} alt="poster" width="50" height="50"/> <br/>
          <p>{this.state.movie.overview}</p>
          <button onClick={this.handleWatchlist}> Add to Watchlist </button>
          <button onClick={this.handleBack}> Go Back </button>
          {this.renderSimilarMovies()}
        </div>
      )
    } if (this.state.badData === true) {
        return "Movie Not Found"
      } else {
        return null
      }
  }

  componentDidMount = () => {
    if (this.props.viewMovie !== null) {
      this.fetchMovieInfo()
    }
  }

  render() {
    console.log(this.state);
    return (
      <div className="movieView">
        <h3>Selected Movie</h3>
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
