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
      debugger
      this.fetchMovies()
    } else {
      return null
    }
    // return this.state.searchList
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

// <p>{this.props.search}</p>


// const Movies = (props) => {
//
//   const fetchMovies = (props) => {
//     fetch(`http://www.omdbapi.com/?s=${props.search}&apikey=7e2663e7`)
//     .then(r => r.json())
//     .then(r => {
//
//     })
//   }
//
//   return (
//     <div>
//       <p>{props.search}</p>
//       <p>{}<p>
//     </div>
//   )
// }
//
// const mapStateToProps = (state) => {
//   return {
//     search: state.search,
//     searchMovies: state.searchMovies,
//     selectedMovie: state.selectedMovie
//   }
// }

// function mapDispatchToProps(dispatch) {
//   console.log('dispatch', dispatch)
//   return {
//     cookie: (something) => dispatch({ //something is really a player
//       type: "CHOOSE_PLAYER",
//       payload: something
//     })
//   }
// }
//
// export default connect(mapStateToProps)(Movies)
