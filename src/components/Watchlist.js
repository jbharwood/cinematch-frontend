import React from 'react'
import {connect} from 'react-redux'
import WatchlistMovie from './WatchlistMovie'
import MovieView from './MovieView'

class Watchlist extends React.Component {

  state = {
    list: [],
    viewMovieCheck: false,
    viewMovie: null,
    filteredList: [],
    filtered: false
  }

  fetchWatchlist = () => {
    // let userId = this.props.match.params.id
    // fetch(`http://localhost:3000/watchlists`)
    // fetch(`http://localhost:3000/users/${this.props.user.id}`)
    fetch(`http://localhost:3000/users/${this.props.user.id}`)
    .then(r => r.json())
    .then(r => {
      let newArr = []
      r.watchlist.map(result => {
        if (result.watched !== true) {
          newArr.push(result)
        }
      })
      this.setState({list: newArr, filteredList: newArr, filtered: false})

    })
  }
  // fetchWatchlist = () => {
  //   // let userId = this.props.match.params.id
  //   // fetch(`http://localhost:3000/watchlists`)
  //   // fetch(`http://localhost:3000/users/${this.props.user.id}`)
  //   fetch(`http://localhost:3000/users/${this.props.user.id}`)
  //   .then(r => r.json())
  //   .then(r => {
  //     r.watchlist.map(result => {
  //       if (result.watched !== true) {
  //         this.setState({list: [...this.state.list, result], filteredList: [...this.state.filteredList, result], filtered: false})
  //       }
  //     })
  //     // r.watchlist.map(result => {
  //     //   if (result.watched !== true)
  //     //   this.setState({list: [...this.state.list, result], filteredList: [...this.state.filteredList, result], filtered: false})
  //     // })
  //   })
  // }

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
    // let newArr = []
    // this.state.filteredList.map(result => {
    //   if (result.watched === true) {
    //     newArr.push(result)
    //   }
    //   this.setState({filteredList: newArr, filtered: true})
    // })
  }
  // fetchFilteredWatchlist = () => {
  //   // let userId = this.props.match.params.id
  //   // fetch(`http://localhost:3000/watchlists`)
  //   // fetch(`http://localhost:3000/users/${this.props.user.id}`)
  //   fetch(`http://localhost:3000/users/${this.props.user.id}`)
  //   .then(r => r.json())
  //   .then(r => {
  //     r.watchlist.map(result => {
  //       if (result.watched === true) {
  //         this.setState({filteredList: [...this.state.filteredList, result], filtered: true})
  //       }
  //     })
  //   })
  // }

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
      // let filtered = this.state.list.filter(r => r.watched === true)
      // debugger
      // this.setState({list: filtered, filtered: !this.state.filtered})
    } else {
      this.fetchWatchlist()
      // this.setState({filteredList: this.state.list, filtered: false})
    }
  }

  renderFilter = () => {
    if (this.state.viewMovieCheck === false) {
      if (this.state.filtered === false) {
        return (
          <button onClick={this.handleWatchedMovies}>View Watched</button>
        )
      } else {
        return (
          <button onClick={this.handleWatchedMovies}>View Unwatched</button>
        )
      }
    } else {
      return null
    }
  }

  renderList = () => {
    if (this.state.filteredList !== [] && this.state.viewMovieCheck === false) {
        return this.state.filteredList.map(l => {
          // if (l.watched != true) {
            return (
              <div className="watchlist">
                <WatchlistMovie changeList={this.changeList}
                  movie={l} changeViewMovie={this.changeViewMovie}
                  filtered={this.state.filtered}/>
              </div>
            )
          // }
        })
    } else if (this.state.viewMovieCheck === true) {
      return (
        <div className="movieView">
          <MovieView changeToWatchlist={this.changeToWatchlist}/>
        </div>
      )
    }
  }

  componentDidMount = () => {
    this.fetchWatchlist()
  }

  render() {
    console.log("watchlist state ", this.state.filteredList);
    return (
      <div>
        <h3>Watchlist</h3>
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
