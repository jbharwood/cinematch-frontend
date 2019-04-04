import React from 'react'
import {connect} from 'react-redux'
import SearchResult from './SearchResult'

class Search extends React.Component {

  state = {
    input: "",
    results: []
  }

  handleTyping = (e) => {
    // e.preventDefault()
    // console.log(this.props.dispatch);
    // debugger
    // this.props.dispatch({ type: "SEARCH_MOVIES", payload: e.target.value })
    // this.props.dispatch(this.this.props.change_input(e))
    this.setState({input: e.target.value})

  }

  handleSearch = (e) => {
    e.preventDefault()
    // console.log(this.this.props.dispatch);
    // debugger
    this.fetchMovies()
    // this.props.dispatch({ type: "FETCH_MOVIE", payload: this.state.input })
    // this.props.dispatch(this.props.change_input(e))
  }

  fetchMovies = () => {
    fetch(`http://www.omdbapi.com/?s=${this.state.input}&apikey=7e2663e7`)
    .then(r => r.json())
    .then(r => {
      this.setState({results: r.Search})
    })
  }

  renderSearchResults = () => {
    if (this.state.results.length > 0) {
      return this.state.results.map(r => {
        return <SearchResult result={r}/>
      })

    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSearch}>
          <input type="text" onChange={this.handleTyping}/>
          <input type="submit" value="Search"/>
        </form>
        <h3>Search Results</h3>
        <p>{this.renderSearchResults()}</p>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    search: state.search
  }
}

// export default connect(mapStateToProps)(Search)
export default Search

// const Search = (props) => {
//
//   const handleTyping = (e) => {
//     // e.preventDefault()
//     // console.log(this.props.dispatch);
//     // debugger
//     props.dispatch({ type: "SEARCH_MOVIES", payload: e.target.value })
//     // this.props.dispatch(this.props.change_input(e))
//
//   }
//
//   const handleSearch = (e) => {
//     e.preventDefault()
//     // console.log(this.props.dispatch);
//     // debugger
//     props.dispatch({ type: "FETCH_MOVIE", payload: props.search })
//     // this.props.dispatch(this.props.change_input(e))
//
//   }
//
//   return (
//     <div>
//       <form onSubmit={handleSearch}>
//         <input type="text" onChange={handleTyping}/>
//         <input type="submit" />
//       </form>
//     </div>
//   )
// }
//
// const mapStateToProps = (state) => {
//   return {
//     search: state.search
//   }
// }
//
// // function mapDispatchToProps(dispatch) {
// //   console.log('dispatch', dispatch)
// //   return {
// //     cookie: (something) => dispatch({ //something is really a player
// //       type: "CHOOSE_PLAYER",
// //       payload: something
// //     })
// //   }
// // }
//
// export default connect(mapStateToProps)(Search)
