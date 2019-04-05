import React from 'react'
import {connect} from 'react-redux'

const SimilarMovie = (props) => {

  const handleViewMovie = () => {
    props.dispatch({type: "VIEW_MOVIE", payload: props.result})
    props.changePage()
  }

  return (
    <div className="similarMovie">
      <h3>{props.result.title}</h3>
      <p>{props.result.release_date}</p>
      <img src={"http://image.tmdb.org/t/p/w185/" + props.result.poster_path} alt="poster" width="50" height="50"/> <br/>
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

export default connect(mapStateToProps)(SimilarMovie)
