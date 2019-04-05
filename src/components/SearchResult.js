import React from 'react'
import {connect} from 'react-redux'

const SearchResult = (props) => {

  // const handleWatchlist = () => {
  //   postToWatchlist(props.result)
  //   // props.dispatch({type: "WATCH_MOVIE", payload: props.result.imdbID})
  // }

  const handleViewMovie = () => {
    props.dispatch({type: "VIEW_MOVIE", payload: props.result})
  }

  // const postToWatchlist = (movie) => {
  //   debugger
  //   fetch(`http://localhost:3000/watchlists`, {
  //     method: 'POST',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       title: movie.Title,
  //       omdb_id: this.state.movie.id,
  //       imdb_id: movie.imdbID,
  //       user_id: this.props.user
  //     })
  //   })
  //   .then(r=>r.json())
  //   .then(r=> {
  //     debugger
  //   })
  // }

  const fetchMovieInfo = () => {
    let id = this.props.viewMovie.imdbID
    // let id = this.props.viewMovie.imdbID.slice(0, -1)
    fetch(`https://api.themoviedb.org/3/find/${id}?api_key=3eb68659d6134fa388c1a0220feb7fd1&external_source=imdb_id`)
    .then(r => r.json())
    .then(r => {
      if (r.movie_results.length !== 0) {
        this.setState({movie: r.movie_results[0]})
      } else if (r.tv_results.length !== 0) {
        this.setState({movie: r.tv_results[0]})
      } else {
        this.setState({badData: true})
      }
    })
  }

  return (
    <div className="searchResult">
      <h3>{props.result.Title}</h3>
      <p>{props.result.Year}</p>
      <img src={props.result.Poster} alt="poster" width="50" height="50"/> <br/>
      <button onClick={handleViewMovie}> View Movie Info </button>
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
