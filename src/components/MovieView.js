import React from 'react'
import {connect} from 'react-redux'
import SimilarMovie from './SimilarMovie'
import adapter from '../services/adapter';
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIcon from '@material-ui/icons/ArrowForwardIos';
import ChatIcon from '@material-ui/icons/Chat';
import BackIcon from '@material-ui/icons/ArrowBack';
import ListIcon from '@material-ui/icons/List';
import CloseIcon from '@material-ui/icons/Close';
import ZoomIcon from '@material-ui/icons/ZoomIn';
import API_URL from '../config.js'

class MovieView extends React.Component {

  constructor(props) {
    super(props)
    this.similarRef = React.createRef()   // Create a ref for scrolling
    this.topRef = React.createRef()   // Create a ref for scrolling
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

  fetchWithOMDBId = (id, media) => {
    fetch(`https://api.themoviedb.org/3/${media}/${id}?api_key=3eb68659d6134fa388c1a0220feb7fd1&language=en-US`)
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
    let media = null
    if (!!movie.title) { //similar movie input check
      title = movie.title
      imdbID = null
      //share from other watchlist check
      if (!!movie.poster) {
        poster = movie.poster
      } else {
        poster = "http://image.tmdb.org/t/p/w185/" + movie.poster_path
      }
      media = "movie"
    } else if (!!movie.Title && movie.Type == "series") { //movie and tv check
      title = movie.Title
      imdbID = movie.imdbID
      poster = movie.Poster
      media = "tv"
    } else if (!!movie.Title && movie.Type == "movie") { //movie and tv check
      title = movie.Title
      imdbID = movie.imdbID
      poster = movie.Poster
      media = "movie"
    } else if (!!movie.name) {//checks for similar tv shows
      title = movie.name
      imdbID = null
      poster = "http://image.tmdb.org/t/p/w185/" + movie.poster_path
      media = "tv"
    } else {
      title = this.state.movie.title
      imdbID = this.state.movie.imdb_id
      poster = "http://image.tmdb.org/t/p/w185/" + this.state.movie.poster_path
    }

    fetch(`${API_URL}/watchlists`, {
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
        poster: poster,
        media: media
      })
    })
    .then(r=>r.json())
    .then(r=> {
    })
  }

  scrollToTopOfPage = () => {
    document.querySelector("main").scrollTo(0,0)
  }

  scrollToSim = () => {
    let p = document.querySelector("main")
    p.scrollTo(0, this.similarRef.current.offsetTop)
  }

  handleBack = () => {
    if (!!this.props.close) {
      this.props.close()
      debugger
      return
    }
    if (!!this.props.fetchPosts) {
      this.props.dispatch({type: "CHANGE_CHATBOX_PAGE", payload: "Chatbox"})
      this.scrollToTopOfPage()
      this.props.fetchPosts()
      return
    }
    if (!!this.props.changeToWatchlist) {
      this.props.changeToWatchlist()
      this.scrollToTopOfPage()
    } else if (!!this.props.changeToList) {
      this.props.changeToList()
      this.scrollToTopOfPage()
    } else {
      this.props.changePage("Search")
      this.scrollToTopOfPage()
    }
  }

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
      this.setState({similarMovies: r.results}, this.scrollToTopOfPage)
    })
  }

  fetchPage = (page=1) => {
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
      this.setState({similarMovies: r.results}, this.scrollToSim)
    })
  }

  handleNextPage = () => {
    this.setState({pageCount: this.state.pageCount += 1}, this.fetchPage(this.state.pageCount))
  }

  handlePrevPage = () => {
    this.setState({pageCount: this.state.pageCount -= 1}, this.fetchPage(this.state.pageCount))
    let page = document.querySelector(".Dashboard-content-12")
    window.scrollTo(0, page - 80)
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
    fetch(`${API_URL}/users/${this.props.user.id}`)
    .then(r => r.json())
    .then(r => {
      this.setState({watchlist: r.watchlist})
    })
  }

  renderWatchButton = () => {
    if (this.state.watchlist.length > 0) {
      //checks if movie is in the watchlist table
      if (Object.values(this.state.watchlist).find(w => w.imdb_id === this.props.viewMovie.imdbID)) {
        return <Button variant="contained" color="primary" title="Already Added to Watchlist"> <CloseIcon /> </Button>
      }
      if (Object.values(this.state.watchlist).find(w => w.omdb_id === this.props.viewMovie.id)) {
        return <Button variant="contained" color="primary" title="Already Added to Watchlist"> <CloseIcon /> </Button>
      }
    }
    if (this.state.clicked === true) {
      return <Button variant="contained" color="primary" title="Already Added to Watchlist"> <CloseIcon /> </Button>
    } else {
        return <Button variant="contained" color="primary" onClick={this.handleWatchlist} title="Add to Watchlist"> <ListIcon /> </Button>
    }
  }

  handleShare = () => {
    //from chatbox check
    let post = null
    let imdb_id = null
    let omdb_id = null
    let media = "movie"
    if (!!this.state.movie.title && this.state.movie.title != null) {
      post = "http://image.tmdb.org/t/p/w185/" + this.state.movie.poster_path
      imdb_id = ""
      omdb_id = this.state.movie.id.toString()
    } else if (!!this.props.viewMovie.name) {
      post = "http://image.tmdb.org/t/p/w185/" + this.props.viewMovie.poster_path
      imdb_id = ""
      omdb_id = this.props.viewMovie.id
      media = "tv"
    } else {
      if (!!this.props.viewMovie.poster) {
        post = this.props.viewMovie.poster
        imdb_id = ""
        omdb_id = this.props.viewMovie.omdb_id
      } else {
        post = this.props.viewMovie.Poster
        imdb_id = this.props.viewMovie.imdbID
        omdb_id = ""
      }
      media = "tv"
    }
    //share from chatbox check
    if (!!this.props.viewMovie.content) {
      post = this.props.viewMovie.content
      imdb_id = ""
      omdb_id = this.props.viewMovie.id
      media = this.props.viewMovie.media
    }
    adapter.createPost({ content: post, feed_id: 1, user_id: this.props.user.id, omdb_id: omdb_id, imdb_id: imdb_id, media: media})
  }

  renderIMDBButton = () => {
    if (!!this.props.viewMovie.imdbID && this.props.viewMovie.imdbID != "") {
      return <a href={`https://www.imdb.com/title/` + this.props.viewMovie.imdbID + `/`} target="_blank">
        <img src="https://yt3.ggpht.com/a-/AAuE7mDrGwDBII_0LO6cM4ud7pVuGIJXSlLrZYEO-Q=s900-mo-c-c0xffffffff-rj-k-no" alt="poster" width="35" height="35" title="Open IMDB" className="picture"/> <br/>
      </a>
    } else if (!!this.props.viewMovie.imdb_id && this.props.viewMovie.imdb_id !== "") {
      return <a href={`https://www.imdb.com/title/` + this.props.viewMovie.imdb_id + `/`} target="_blank">
        <img src="https://yt3.ggpht.com/a-/AAuE7mDrGwDBII_0LO6cM4ud7pVuGIJXSlLrZYEO-Q=s900-mo-c-c0xffffffff-rj-k-no" alt="poster" width="35" height="35" title="Open IMDB" className="picture"/> <br/>
      </a>
    } else {
      return null
    }
  }

  renderDate = (date) => {
    if (!!date) {
      return date.substring(0,4)
    }
  }

  renderMoviePage = () => {
    if (this.state.movie !== null) {
      //tv check from SearchResult
      if (!!this.props.viewMovie.name) {
        return (
          <div>
            <h2>{this.props.viewMovie.name}</h2>
            <h3>{this.renderDate(this.props.viewMovie.first_air_date)}</h3>
            <img src={"http://image.tmdb.org/t/p/w185/" + this.props.viewMovie.poster_path} alt="poster" width="150" height="150"/> <br/>
            <p>{this.props.viewMovie.overview}</p>
            {this.renderIMDBButton()}
            {this.renderWatchButton()}
            <div class="divider"/>
            <Button variant="contained" color="primary" onClick={this.handleShare} title="Share to Chat"> <ChatIcon /> </Button>
            <div class="divider"/>
            <Button variant="contained" color="primary" onClick={this.handleBack} title="Go Back"> <BackIcon /> </Button>
            <div ref={this.similarRef}/>
            <br/>
            <h3 class="sim" >Similar TV Shows Page: {this.state.pageCount}</h3>
            {this.renderPageButtons()}
            {this.renderSimilarMovies()}
          </div>
        )
        //tv check from Watchlist
      } else if (!!this.state.movie.name) {
        return (
          <div>
            <h2>{this.state.movie.name}</h2>
            <h3>{this.renderDate(this.state.movie.first_air_date)}</h3>
            <img src={"http://image.tmdb.org/t/p/w185/" + this.state.movie.poster_path} alt="poster" width="150" height="150"/> <br/>
            <p>{this.state.movie.overview}</p>
            {this.renderIMDBButton()}
            {this.renderWatchButton()}
            <div class="divider"/>
            <Button variant="contained" color="primary" onClick={this.handleShare} title="Share to Chat"> <ChatIcon /> </Button>
            <div class="divider"/>
            <Button variant="contained" color="primary" onClick={this.handleBack} title="Go Back"> <BackIcon /> </Button>
            <div ref={this.similarRef}/>
            <br/>
            <h3 class="sim" >Similar TV Shows Page: {this.state.pageCount}</h3>
            {this.renderPageButtons()}
            {this.renderSimilarMovies()}
          </div>
        )
      }
      //for movies
      return (
        <div>
          <h2>{this.state.movie.title}</h2>
          <h3>{this.renderDate(this.state.movie.release_date)}</h3>
          <img src={"http://image.tmdb.org/t/p/w185/" + this.state.movie.poster_path} alt="poster" width="150" height="150"/> <br/>
          <p>{this.state.movie.overview}</p>
          {this.renderIMDBButton()}
          {this.renderWatchButton()}
          <div class="divider"/>
          <Button variant="contained" color="primary" onClick={this.handleShare} title="Share to Chat"> <ChatIcon /> </Button>
          <div class="divider"/>
          <Button variant="contained" color="primary" onClick={this.handleBack} title="Go Back"> <BackIcon /> </Button>
          <div ref={this.similarRef}/>
          <br/>
          <h3 class="sim" >Similar Movies Page: {this.state.pageCount}</h3>
          {this.renderPageButtons()}
          {this.renderSimilarMovies()}
        </div>
      )
    } if (this.state.badData === true) {
        return (
          <div>
            <p>Movie Not Found</p>
            <Button variant="contained" color="primary" onClick={this.handleBack}> Go Back </Button>
          </div>
        )
      } else {
        return null
      }
  }

  renderPageButtons = () => {
    if (this.state.pageCount === 1) {
      return <ArrowForwardIcon onClick={this.handleNextPage}/>
    } else if (this.state.pageCount === 5){
      return <ArrowBackIcon onClick={this.handleNextPage}/>
    } else {
      return (
        <div>
          <ArrowBackIcon onClick={this.handlePrevPage}/>
          <div class="divider"/>
          <ArrowForwardIcon onClick={this.handleNextPage}/>
        </div>
      )
    }
  }

  componentDidMount = () => {
    this.scrollToTopOfPage()
    //from top movies/home
    if (this.props.viewMovie.imdb_id === undefined
      && this.props.viewMovie.omdb_id === undefined) {
        this.fetchWithOMDBId(this.props.viewMovie.id, "movie")
    }

    //chatbox check
    if (!!this.props.viewMovie.feed_id) {
      if (this.props.viewMovie.omdb_id !== "") {
        this.fetchWithOMDBId(this.props.viewMovie.omdb_id, this.props.viewMovie.media)
        return
      } else {
        this.fetchMovieInfo()
        return
      }
    }

    //null input check
    if (this.props.viewMovie.imdb_id === "") {
      this.fetchWithOMDBId()
    } else if (this.props.viewMovie.omdb_id === "") {
      this.fetchMovieInfo()
    }

    //viewMovie from Search
    if ((this.props.viewMovie.imdbID !== null && this.props.viewMovie.imdbID !== undefined)
      || (this.props.viewMovie.imdb_id !== null && this.props.viewMovie.imdb_id !== undefined)) {
      this.fetchMovieInfo()
      // watchlist view info movie check
    } else if (!!this.props.viewMovie.omdb_id && this.props.viewMovie.imdb_id === null) {
        this.fetchWithOMDBId(this.props.viewMovie.omdb_id, this.props.viewMovie.media)
    }

    this.fetchUserWatchlist()
  }

  render() {
    return (
      <div className="movieView">
      <div className="top" ref={this.topRef}> </div>
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
    movie: state.movieInfo,
    history: state.history,
    chatboxPage: state.chatboxPage
  }
}

export default connect(mapStateToProps)(MovieView)
