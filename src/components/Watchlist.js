import React from 'react'
import {connect} from 'react-redux'
import WatchlistMovie from './WatchlistMovie'
import MovieView from './MovieView'

class Watchlist extends React.Component {

  state = {
    list: [],
    viewMovieCheck: false,
    viewMovie: null

  }

  fetchWatchlist = () => {
    // let userId = this.props.match.params.id
    // fetch(`http://localhost:3000/watchlists`)
    // fetch(`http://localhost:3000/users/${this.props.user.id}`)
    debugger
    fetch(`http://localhost:3000/users/${this.props.user.id}`)
    .then(r => r.json())
    .then(r => {
      r.watchlist.map(result => {
          this.setState({list: [...this.state.list, result]})
      })
    })
  }

  changeList = (movieId) => {
    this.setState({list: this.state.list.filter(function(m) {
        return m.id !== movieId
    })});
  }

  changeViewMovie = (movie) => {
    this.setState({viewMovieCheck: true})
  }

  changeToWatchlist = () => {
    this.setState({viewMovieCheck: false})
  }

  renderList = () => {
    if (this.state.list !== [] && this.state.viewMovieCheck === false) {
        return this.state.list.map(l => {
          return (
            <div className="watchlist">
              <WatchlistMovie changeList={this.changeList}
                movie={l} changeViewMovie={this.changeViewMovie}/>
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

  componentDidMount = () => {
    this.fetchWatchlist()
  }

  render() {
    return (
      <div>
        <h3>Watchlist</h3>
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
