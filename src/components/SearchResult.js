import React from 'react'
import {connect} from 'react-redux'
import Button from '@material-ui/core/Button';

const SearchResult = (props) => {

  const handleViewMovie = () => {
    props.dispatch({type: "VIEW_MOVIE", payload: props.result})
    props.changePage("MovieView")
  }

  return (
    <div className="searchResult">
      <h3>{props.result.Title}</h3>
      <p>{props.result.release_date}</p>
      <img src={props.result.Poster} alt="poster" width="50" height="50"/> <br/>
      <Button variant="contained" color="primary" onClick={handleViewMovie}> View Info </Button>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    search: state.search
  }
}

export default connect(mapStateToProps)(SearchResult)
