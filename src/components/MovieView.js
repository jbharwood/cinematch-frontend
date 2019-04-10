import React from 'react'
import {connect} from 'react-redux'
import SimilarMovie from './SimilarMovie'

class MovieView extends React.Component {

  constructor(props) {
    super(props)
    this.similarRef = React.createRef()   // Create a ref for scrolling
  }

  state = {
    movie: null,
    badData: false,
    similarMovies: [],
    clicked: false,
    pageCount: 1,
    watchlist: []
  }

  fetchMovieInfo = () => {
    let id = null
    if (!!this.props.viewMovie.imdbID) { //from searchResult check
      id = this.props.viewMovie.imdbID
    } else if (!!this.props.viewMovie.imdb_id) {
      id = this.props.viewMovie.imdb_id
    }
    // let id = this.props.viewMovie.imdbID
    if (id.length > 9) {
      id = this.props.viewMovie.imdbID.slice(0, -1)
    }
    fetch(`https://api.themoviedb.org/3/find/${id}?api_key=3eb68659d6134fa388c1a0220feb7fd1&external_source=imdb_id`)
    .then(r => r.json())
    .then(r => {
      if (r.movie_results.length !== 0) {
        this.setState({movie: r.movie_results[0]}, this.fetchSimilarMovies)
      } else if (r.tv_results.length !== 0) { //tv check
        this.setState({movie: r.tv_results[0]}, this.fetchSimilarMovies)
      } else {
        this.setState({badData: true})
      }
    })
  }

  fetchWithOMDBId = (id) => {
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=3eb68659d6134fa388c1a0220feb7fd1&language=en-US`)
    .then(r => r.json())
    .then(r => {
      if (r) {
        this.setState({movie: r, pageCount: 1}, this.fetchSimilarMovies)
      } else {
        this.setState({badData: true, pageCount: 1})
      }
    })
  }

  handleWatchlist = () => {
    this.changeWatchButton()
    this.postToWatchlist(this.props.viewMovie)
  }

  changeWatchButton = () => {
    this.setState({clicked: !this.state.clicked})
  }

  postToWatchlist = (movie) => {
    let title = null
    let imdbID = null
    let poster = null
    if (!!movie.title) { //similar movie input check
      title = movie.title
      imdbID = null
      poster = "http://image.tmdb.org/t/p/w185/" + movie.poster_path
    } else if (!!movie.Title) { //movie and tv check
      title = movie.Title
      imdbID = movie.imdbID
      poster = movie.Poster
    } else if (!!movie.name) {//checks for similar tv shows
      title = movie.name
      imdbID = null
      poster = "http://image.tmdb.org/t/p/w185/" + movie.poster_path
    }
    fetch(`http://localhost:3000/watchlists`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: title,
        omdb_id: this.state.movie.id, //look at later?
        imdb_id: imdbID,
        user_id: this.props.user.id,
        poster: poster
      })
    })
    .then(r=>r.json())
    .then(r=> {
    })
  }

  handleBack = () => {
    if (!!this.props.changeToWatchlist) {
      this.props.changeToWatchlist()
    } else {
      this.props.changePage("Search")
    }
  }

  // fetchSimilarMovies = (omdbId, page=1) => {
  fetchSimilarMovies = (page=1) => {
    let id = this.state.movie.id
    let media = "movie"
    //tv check
    if (!!this.state.movie.name) {
      media = "tv"
    } else if (!!this.props.viewMovie.name) {
      media = "tv"
      id = this.props.viewMovie.id
    }
    fetch(`https://api.themoviedb.org/3/${media}/${id}/similar?api_key=3eb68659d6134fa388c1a0220feb7fd1&language=en-US&page=${page}`)
    .then(r => r.json())
    .then(r => {
      this.setState({similarMovies: r.results})
    })
  }

  handleNextPage = () => {
    this.setState({pageCount: this.state.pageCount += 1}, this.fetchSimilarMovies(this.state.pageCount))
    // this.setState({pageCount: 2}, this.fetchSimilarMovies(2))
    window.scrollTo(0, this.similarRef.current.offsetTop) //scroll to similar on click
  }

  handlePrevPage = () => {
    this.setState({pageCount: this.state.pageCount -= 1}, this.fetchSimilarMovies(this.state.pageCount))
    window.scrollTo(0, this.similarRef.current.offsetTop) //scroll to similar on click
  }

  renderSimilarMovies = () => {
    if (!!this.state.similarMovies && this.state.similarMovies.length > 0) {
      return this.state.similarMovies.map (m => {
        return  <SimilarMovie result={m}
        changePage={this.props.changePage}
        fetchWithOMDBId={this.fetchWithOMDBId}
        changeWatchButton={this.changeWatchButton}
        clicked={this.state.clicked}
        fetchSimilarMovies={this.fetchSimilarMovies}
        changeToWatchlist={this.props.changeToWatchlist}/>
      })
    }
  }

  fetchUserWatchlist = () => {
    fetch(`http://localhost:3000/users/${this.props.user.id}`)
    .then(r => r.json())
    .then(r => {
      this.setState({watchlist: r.watchlist})
    })
  }

  renderWatchButton = () => {
    // if (this.state.clicked === true || !!this.props.changeToWatchlist) {
    if (this.state.watchlist.length > 0) {
      //checks if movie is in the watchlist table
      if (Object.values(this.state.watchlist).find(w => w.id === this.props.viewMovie.id)) {
        return <button> Added to Watchlist </button>
      }
      if (Object.values(this.state.watchlist).find(w => w.omdb_id === this.props.viewMovie.id)) {
        return <button> Added to Watchlist </button>
      }
    }
    if (this.state.clicked === true) {
      return <button> Added to Watchlist </button>
    } else {
      return <button onClick={this.handleWatchlist}> Add to Watchlist </button>
    }
    //fetch for watchlist and render a button
  }

  // renderWatchButton = () => {
  //   debugger
  //   if (this.state.clicked === true) {
  //     return <button> Added to Watchlist </button>
  //   } else {
  //     return <button onClick={this.handleWatchlist}> Add to Watchlist </button>
  //   }
    // if (this.state.clicked === true) {
    //   debugger
    //   return <button> Added to Watchlist </button>
    // } else if (this.state.fromWatchlist === false && !!this.props.changeToWatchlist) {
    //   debugger
    //   this.setState({fromWatchlist: true})
    //   return <button> Added to Watchlist </button>
    // } else if (this.state.fromWatchlist === true && !!this.props.changeToWatchlist) {
    //   debugger
    //   return <button onClick={this.handleWatchlist}> Add to Watchlist </button>
    // } else {
    //   debugger
    //   return <button onClick={this.handleWatchlist}> Add to Watchlist </button>
    //
  //   // }
  // }

  renderMoviePage = () => {
    if (this.state.movie !== null) {
      //tv check from SearchResult
      if (!!this.props.viewMovie.name) {
        return (
          <div>
            <h3>{this.props.viewMovie.name}</h3>
            <p>{this.props.viewMovie.first_air_date}</p>
            <img src={"http://image.tmdb.org/t/p/w185/" + this.props.viewMovie.poster_path} alt="poster" width="50" height="50"/> <br/>
            <p>{this.props.viewMovie.overview}</p>
            {this.renderWatchButton()}
            <button onClick={this.handleBack}> Go Back </button>
            <h3 ref={this.similarRef}>Similar TV Shows</h3>
            {this.renderSimilarMovies()}
          </div>
        )
        //tv check from Watchlist
      } else if (!!this.state.movie.name) {
        return (
          <div>
            <h3>{this.state.movie.name}</h3>
            <p>{this.state.movie.first_air_date}</p>
            <img src={"http://image.tmdb.org/t/p/w185/" + this.state.movie.poster_path} alt="poster" width="50" height="50"/> <br/>
            <p>{this.state.movie.overview}</p>
            {this.renderWatchButton()}
            <button onClick={this.handleBack}> Go Back </button>
            <h3 ref={this.similarRef}>Similar TV Shows</h3>
            {this.renderSimilarMovies()}
          </div>
        )
      }
      //for movies
      return (
        <div>
          <h3>{this.state.movie.title}</h3>
          <p>{this.state.movie.release_date}</p>
          <img src={"http://image.tmdb.org/t/p/w185/" + this.state.movie.poster_path} alt="poster" width="50" height="50"/> <br/>
          <p>{this.state.movie.overview}</p>
          {this.renderWatchButton()}
          <button onClick={this.handleBack}> Go Back </button>
          <h3 ref={this.similarRef}>Similar Movies</h3>
          {this.renderSimilarMovies()}
        </div>
      )
    } if (this.state.badData === true) {
        return (
          <div>
            <p>Movie Not Found</p>
            <button onClick={this.handleBack}> Go Back </button>
          </div>
        )
      } else {
        return null
      }
  }

  renderPageButtons = () => {
    if (this.state.pageCount === 1) {
      return <button onClick={this.handleNextPage}>Next Page</button>
    } else if (this.state.pageCount === 5){
      return <button onClick={this.handlePrevPage}>Previous Page</button>
    } else {
      return (
        <div>
          <button onClick={this.handlePrevPage}>Previous Page</button>
          <button onClick={this.handleNextPage}>Next Page</button>
        </div>
      )
    }
  }

  componentDidMount = () => {
    // if (this.props.viewMovie !== null) {
    if ((this.props.viewMovie.imdbID !== null && this.props.viewMovie.imdbID !== undefined)
      || (this.props.viewMovie.imdb_id !== null && this.props.viewMovie.imdb_id !== undefined)) {
      this.fetchMovieInfo()
    } else if (!!this.props.viewMovie.omdb_id && this.props.viewMovie.imdb_id === null) {
      this.fetchWithOMDBId(this.props.viewMovie.omdb_id)
    }
    if (!!this.props.changeToWatchlist) {
      this.fetchUserWatchlist()
    }
  }

  render() {
    console.log("pageCount state: ", this.state.pageCount);
    return (
      <div className="movieView">
        {this.renderMoviePage()}
        {this.renderPageButtons()}
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
