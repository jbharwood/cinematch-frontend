import React from 'react'
import {connect} from 'react-redux'
import WatchlistMovie from './WatchlistMovie'
import MovieView from './MovieView'
import Button from '@material-ui/core/Button';

class Watchlist extends React.Component {

  state = {
    list: [],
    viewMovieCheck: false,
    viewMovie: null,
    filteredList: [],
    filtered: false
  }

  fetchWatchlist = () => {
    let id = this.props.user.id
    if (this.props.user === null) {
      this.props.history.push(`/`)
      return null
    } else if (!!this.props.clickedUserID) {
      id = this.props.clickedUserID
    }
    fetch(`http://localhost:3000/users/${id}`)
    .then(r => r.json())
    .then(r => {
      if (!!r.watchlist) {
        let newArr = []
        r.watchlist.map(result => {
          if (result.watched !== true) {
            newArr.push(result)
          }
        })
        this.setState({list: newArr, filteredList: newArr, filtered: false})
      } else {
        return null
      }
    })
  }

  fetchFilteredWatchlist = () => {
    fetch(`http://localhost:3000/users/${this.props.user.id}`)
    .then(r => r.json())
    .then(r => {
      let newArr = []
      r.watchlist.map(result => {
        if (result.watched === true) {
          newArr.push(result)
        }
      })
      this.setState({filteredList: newArr, filtered: true})
    })
  }

  changeList = (movieId) => {
    this.setState({filteredList: this.state.filteredList.filter(function(m) {
        return m.id !== movieId
    })});
  }

  changeViewMovie = (movie) => {
    this.setState({viewMovieCheck: true})
  }

  changeToWatchlist = () => {
    if (this.state.filtered === true) {
      this.setState({viewMovieCheck: false})
    } else {
      this.setState({viewMovieCheck: false})
      this.fetchWatchlist()
    }
  }

  handleWatchedMovies = () => {
    if (this.state.filtered === false) {
      this.fetchFilteredWatchlist()
    } else {
      this.fetchWatchlist()
    }
  }

  renderFilter = () => {
    if (this.state.viewMovieCheck === false) {
      if (this.state.filtered === false) {
        return (
          <Button variant="contained" color="primary" onClick={this.handleWatchedMovies}>View Watched</Button>
        )
      } else {
        return (
          <Button variant="contained" color="primary" onClick={this.handleWatchedMovies}>View Unwatched</Button>
        )
      }
    } else {
      return null
    }
  }

  handleBackButton = () => {
    this.props.dispatch({type: "CHANGE_CHATBOX_PAGE", payload: "Chatbox"})
  }

  renderBackButton = () => {
    if (!!this.props.clickedUserID) {
      return (
        <div className="watchlistBackButton">
          <Button variant="contained" color="primary" onClick={this.handleBackButton}>Go Back</Button> <br/>
        </div>
      )
    }
  }

  renderList = () => {
    if (!!this.props.clickedUserID && this.state.filteredList !== [] && this.state.viewMovieCheck === false) {
        return this.state.filteredList.map(l => {
          return (
            <div className="watchlist">
              <WatchlistMovie changeList={this.changeList}
                movie={l} changeViewMovie={this.changeViewMovie}
                filtered={this.state.filtered}
                clickedUserID={this.props.clickedUserID}/>
            </div>
          )
        })
    } else if (this.state.filteredList !== [] && this.state.viewMovieCheck === false) {
        return this.state.filteredList.map(l => {
          return (
            <div className="watchlist">
              <WatchlistMovie changeList={this.changeList}
                movie={l} changeViewMovie={this.changeViewMovie}
                filtered={this.state.filtered}
                clickedUserID={this.props.clickedUserID}/>
            </div>
          )
        })
    } else if (this.state.viewMovieCheck === true) {
      return (
        <div className="movieView">
          <MovieView changeToWatchlist={this.changeToWatchlist}/>
        </div>
      )
    }
  }

  renderTitle = () => {
    if (!!this.props.clickedUserID) {
      return <h3>{this.props.clickedUsername}'s Watchlist</h3>
    } else {
      return <h3>Your Watchlist</h3>
    }
  }

  componentDidMount = () => {
    if (!!this.props.user) {
      this.fetchWatchlist()
    }
  }

  render() {
    return (
      <div className="watchlist">
        <h3>Top Rated Movies</h3>
        {this.renderBackButton()}
        {this.renderTitle()}
        {this.renderFilter()}
        {this.renderList()}
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Watchlist)
