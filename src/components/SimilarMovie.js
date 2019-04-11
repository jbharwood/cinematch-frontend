import React from 'react'
import {connect} from 'react-redux'

const SimilarMovie = (props) => {

  const handleViewMovie = () => {
    if (props.clicked === true) {
      props.changeWatchButton()
    }
    let media = "movie"
    if (!!props.result.name) {
      media = "tv"
    }
    props.dispatch({type: "VIEW_MOVIE", payload: props.result})
    props.fetchWithOMDBId(props.result.id, media)
    window.scrollTo(0, 0) //scroll to the top of the page on click
  }

  const renderSimilar = () => {
    //tv check
    if (!!props.result.name) {
      return (
        <div className="similarMovie">
          <h3>{props.result.name}</h3>
          <p>{props.result.first_air_date}</p>
          <img src={"http://image.tmdb.org/t/p/w185/" + props.result.poster_path} alt="poster" width="50" height="50"/> <br/>
          <button onClick={handleViewMovie}> View Info </button>
        </div>
      )
    }
    return (
      <div className="similarMovie">
        <h3>{props.result.title}</h3>
        <p>{props.result.release_date}</p>
        <img src={"http://image.tmdb.org/t/p/w185/" + props.result.poster_path} alt="poster" width="50" height="50"/> <br/>
        <button onClick={handleViewMovie}> View Info </button>
      </div>
    )
  }

  return (
    <div>
      {renderSimilar()}
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
