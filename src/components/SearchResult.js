import React from 'react'
import {connect} from 'react-redux'

const SearchResult = (props) => {

  // const handleWatchlist = () => {
  //   postToWatchlist(props.result)
  //   // props.dispatch({type: "WATCH_MOVIE", payload: props.result.imdbID})
  // }

  const handleViewMovie = () => {
    props.dispatch({type: "VIEW_MOVIE", payload: props.result})
    props.changePage("MovieView")
  }

  return (
    <div className="searchResult">
      <h3>{props.result.Title}</h3>
      <p>{props.result.release_date}</p>
      <img src={props.result.Poster} alt="poster" width="50" height="50"/> <br/>
      <button onClick={handleViewMovie}> View Info </button>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    search: state.search,
    user: state.user
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
