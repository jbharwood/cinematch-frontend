import React from 'react'
import {connect} from 'react-redux'
import WatchlistMovie from './WatchlistMovie'

class Watchlist extends React.Component {

  state = {
    list: []
  }

  fetchWatchlist = () => {
    // let userId = this.props.match.params.id
    // fetch(`http://localhost:3000/watchlists`)
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

  renderList = () => {
    if (this.state.list !== []) {
      return this.state.list.map(l => {
        return <WatchlistMovie changeList={this.changeList} movie={l}/>
      })
    }
  }

  componentDidMount = () => {
    this.fetchWatchlist()
  }

  render() {
    return (
      <div>
        <h3>Watchlist</h3>
        <div className="watchlist">
          {this.renderList()}
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

export default connect(mapStateToProps)(Watchlist)
