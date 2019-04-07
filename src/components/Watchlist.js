import React from 'react'
import {connect} from 'react-redux'

class Watchlist extends React.Component {

  state = {
    list: []
  }

  fetchWatchlist = () => {
    // let userId = this.props.match.params.id
    fetch(`http://localhost:3000/watchlists`)
    .then(r => r.json())
    .then(r => {
      r.map(result => {
        if (result.user_id === this.props.user) {
          this.setState({list: [...this.state.list, result]})
        }
      })
    })
  }

  renderList = () => {
    if (this.state.list !== []) {
      return this.state.list.map(l => {
        return (
          <div>
            {l.title} <br/>
            <img src={l.poster} alt="poster" width="50" height="50"/> <br/>
          </div>
        )
      })
    }
  }

  componentDidMount = () => {
    this.fetchWatchlist()
  }

  render() {
    console.log(this.state.list);
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
