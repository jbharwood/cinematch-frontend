import React from 'react'
import {connect} from 'react-redux'

class Movies extends React.Component {

  state = {
    searchList: []
  }

  fetchMovies = (props) => {
    fetch(`http://www.omdbapi.com/?s=${this.props.search}&apikey=7e2663e7`)
    .then(r => r.json())
    .then(r => {
      this.setState({searchList: [...this.state.searchList, r]})
    })
  }

  renderSearchResults = () => {
    if (this.props.searchString !== undefined) {
      this.fetchMovies()
    } else {
      return null
    }
  }

  render() {
    return (
      <div>
        <p>{this.renderSearchResults()}</p>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    search: state.search,
    searchMovies: state.searchMovies,
    selectedMovie: state.selectedMovie
  }
}

export default connect(mapStateToProps)(Movies)
