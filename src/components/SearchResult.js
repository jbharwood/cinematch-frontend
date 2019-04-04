import React from 'react'
import {connect} from 'react-redux'

const SearchResult = (props) => {

  const handleWatchlist = () => {
    props.dispatch({ type: "WATCH_MOVIE", payload: props.result.imdbID })
  }

  const handleViewMovie = () => {
    props.dispatch({ type: "VIEW_MOVIE", payload: props.result.imdbID })
  }


  return (
    <div className="searchResult">
      <h3>{props.result.Title}</h3>
      <p>{props.result.Year}</p>
      <img src={props.result.Poster} alt="poster" width="50" height="50"/> <br/>
      <button onClick={handleWatchlist}> Add to Watchlist </button>
      <button onClick={handleViewMovie}> View Movie Info </button>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    search: state.search
  }
}

export default connect(mapStateToProps)(SearchResult)

// import React from "react";
// import {connect} from 'react-redux'
//
//
// class SearchResult extends React.Component {
//
//   render() {
//     console.log("hit");
//     return (
//       <div>
//         {this.props.result.Title}
//       </div>
//     )
//   }
// }
// export default SearchResult
