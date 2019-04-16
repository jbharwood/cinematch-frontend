import React from 'react'
import {connect} from 'react-redux'
import HomeMovie from './HomeMovie'
import MovieView from './MovieView'
import Button from '@material-ui/core/Button';

class Home extends React.Component {

  constructor(props) {
    super(props)
    this.similarRef = React.createRef()   // Create a ref for scrolling
  }

  state = {
    list: [],
    viewMovieCheck: false,
    viewMovie: null,
    pageCount: 1
  }

  fetchTopRated = (page=1) => {
    let id = this.props.user.id
    if (this.props.user === null) {
      this.props.history.push(`/`)
      return null
    }
    fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=3eb68659d6134fa388c1a0220feb7fd1&language=en-US&page=${page}`)
    .then(r => r.json())
    .then(r => {
      this.setState({list: r.results})
    })
  }

  changeViewMovie = (movie) => {
    this.setState({viewMovieCheck: true})
  }

  changeToHome = () => {
    this.setState({viewMovieCheck: false})
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
    if (this.state.pageCount === 1) {
      return <Button variant="contained" color="primary" onClick={this.handleNextPage}>Next Page</Button>
    } else if (this.state.pageCount === 5){
      return <Button variant="contained" color="primary" onClick={this.handlePrevPage}>Previous Page</Button>
    } else {
      return (
        <div>
          <Button variant="contained" color="primary" onClick={this.handlePrevPage}>Previous Page</Button>
          <Button variant="contained" color="primary" onClick={this.handleNextPage}>Next Page</Button>
        </div>
      )
    }
  }

  renderList = () => {
    if (this.state.viewMovieCheck === false) {
        return this.state.list.map(l => {
          return (
            <div className="home">
              <HomeMovie movie={l} changeViewMovie={this.changeViewMovie}/>
            </div>
          )
        })
    } else if (this.state.viewMovieCheck === true) {
      return (
        <div className="movieView">
          <MovieView changeToHome={this.changeToHome}/>
        </div>
      )
    }
  }

  componentDidMount = () => {
    if (!!this.props.user) {
      this.fetchTopRated()
    }
  }

  render() {
    return (
      <div className="watchlist">
        <h3 ref={this.similarRef}>Top Rated Movies Page: {this.state.pageCount}</h3>
        {this.renderList()}
        {this.renderPageButtons()}
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Home)
