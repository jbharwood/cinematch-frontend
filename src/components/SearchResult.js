import React from 'react'
import {connect} from 'react-redux'
import Button from '@material-ui/core/Button';

const SearchResult = (props) => {

  const handleViewMovie = () => {
    props.dispatch({type: "VIEW_MOVIE", payload: props.result})
    props.changePage("MovieView")
  }

  const renderYear = () => {
    if (!!props.result.Year) {
      return props.result.Year.slice(0,4)
    }
  }

  //for heroku mixed http/https bug
  const renderPoster = () => {
    let noHTTP = ""
    if (process.env["NODE_ENV"] === "development") {
      return props.result.Poster
    } else if (process.env["NODE_ENV"] === "production") {
      let noHTTP = props.result.Poster.replace(/^https?:/, '')
      return noHTTP
    }
  }

  return (
    <div className="watchlistMovie" onClick={handleViewMovie} style={{ cursor: 'pointer' }}>
      <h2>{props.result.Title}</h2>
      <h3>{renderYear()}</h3>
      <img src={renderPoster()} alt="poster" width="150" height="150"/> <br/>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    search: state.search
  }
}

export default connect(mapStateToProps)(SearchResult)
