import React from 'react'
import {connect} from 'react-redux'
import ListMovie from './ListMovie'
import MovieView from './MovieView'
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIcon from '@material-ui/icons/ArrowForwardIos';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    margin: 'auto',
    maxWidth: 300,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
});

class List extends React.Component {

  constructor(props) {
    super(props)
    this.similarRef = React.createRef()   // Create a ref for scrolling
  }

  state = {
    list: [],
    viewMovieCheck: false,
    viewMovie: null,
    pageCount: 1,
    genres: []
  }

  fetchTopRated = (page=1) => {
    // let id = this.props.user.id
    // if (this.props.user === null) {
    //   this.props.history.push(`/`)
    //   return null
    // }
    fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=3eb68659d6134fa388c1a0220feb7fd1&language=en-US&page=${page}`)
    .then(r => r.json())
    .then(r => {
      this.setState({list: r.results})
    })
  }

  fetchGenres = () => {
    fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=3eb68659d6134fa388c1a0220feb7fd1&language=en-US`)
    .then(r => r.json())
    .then(r => {
      this.setState({genres: r.genres})
    })
  }

  changeViewMovie = (movie) => {
    this.setState({viewMovieCheck: true})
    debugger
  }

  changeToList = () => {
    this.setState({viewMovieCheck: false})
    let page = document.querySelector(".Dashboard-content-12")
    page.scrollTo(0, 0)
  }

  handleBackButton = () => {
    this.props.dispatch({type: "CHANGE_CHATBOX_PAGE", payload: "Chatbox"})
  }

  handleNextPage = () => {
    this.setState({pageCount: this.state.pageCount += 1}, this.fetchTopRated(this.state.pageCount))
    let page = document.querySelector(".Dashboard-content-12")
    page.scrollTo(0, this.similarRef.current.offsetTop - 80)
    // window.scrollTo(0, this.similarRef.current.offsetTop) //scroll to similar on click
  }

  handlePrevPage = () => {
    this.setState({pageCount: this.state.pageCount -= 1}, this.fetchTopRated(this.state.pageCount))
    let page = document.querySelector(".Dashboard-content-12")
    page.scrollTo(0, this.similarRef.current.offsetTop - 80)
    // window.scrollTo(0, this.similarRef.current.offsetTop) //scroll to similar on click
  }

  renderPageButtons = () => {
    if (this.state.viewMovieCheck === true) {
      return null
    }
    if (this.state.pageCount === 1) {
      return <ArrowForwardIcon onClick={this.handleNextPage}/>
      // return <Button variant="contained" color="primary" onClick={this.handleNextPage}>Next Page</Button>
    } else if (this.state.pageCount === 100){
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

  renderList = () => {
    if (this.state.viewMovieCheck === false) {
      return this.state.list.map(l => {
        return (
          <div className="list">
            <ListMovie movie={l} genres={this.state.genres} changeViewMovie={this.changeViewMovie}/>
          </div>
        )
      })
    } else if (this.state.viewMovieCheck === true) {
      return (
        <div className="movieView">
          <MovieView changeToList={this.changeToList}/>
        </div>
      )
    }
  }

  renderTitle = () => {
    if (this.state.viewMovieCheck === true) {
      return null
    } else {
      return <h3 ref={this.similarRef}>Top Rated Movies Page: {this.state.pageCount}</h3>
    }
  }

  componentDidMount = () => {
    //this.props.dispatch({type: "HIDE_APP", payload: true})
    let page = document.querySelector(".Dashboard-content-12")
    page.scrollTo(0, 0)
    // if (!!this.props.user) {
    this.fetchGenres()
    this.fetchTopRated()
    // }
  }

  render() {
    return (
      <div className="list">
        {this.renderTitle()}
        <div className="pageButtons">
          {this.renderPageButtons()}
        </div>
        {this.renderList()}
        <div className="pageButtons">
          {this.renderPageButtons()}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(List)
