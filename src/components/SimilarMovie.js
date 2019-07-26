import React from 'react'
import {connect} from 'react-redux'
import Button from '@material-ui/core/Button';

class SimilarMovie extends React.Component {

  constructor(props) {
    super(props)
    this.topRef = React.createRef()   // Create a ref for scrolling
  }

  handleViewMovie = () => {
    if (this.props.clicked === true) {
      this.props.changeWatchButton()
    }
    let media = "movie"
    if (!!this.props.result.name) {
      media = "tv"
    }
    this.props.dispatch({type: "VIEW_MOVIE", payload: this.props.result})
    this.props.fetchWithOMDBId(this.props.result.id, media)
    // let page = document.querySelector(".Dashboard-content-12")
    // page.scrollTo(0, 0)
    document.querySelector("main").scrollTo(0,0)
  }

  renderSimilar = () => {
    //tv check
    if (!!this.props.result.name) {
      return (
        <div className="watchlistMovie" style={{ cursor: 'pointer' }} onClick={this.handleViewMovie}>
        <div className="top" ref={this.topRef}> </div>
          <h2>{this.props.result.name}</h2>
          <p>{this.props.result.first_air_date.slice(0,4)}</p>
          <img src={"http://image.tmdb.org/t/p/w185/" + this.props.result.poster_path} alt="poster" width="150" height="150"/> <br/>
        </div>
      )
    }
    return (
      <div className="watchlistMovie" style={{ cursor: 'pointer' }} onClick={this.handleViewMovie}>
      <div className="top" ref={this.topRef}> </div>
        <h2>{this.props.result.title}</h2>
        <p>{this.props.result.release_date.slice(0,4)}</p>
        <img src={"http://image.tmdb.org/t/p/w185/" + this.props.result.poster_path} alt="poster" width="150" height="150"/> <br/>
      </div>
    )
  }

  render() {
    return (
      <div>
        <div className="top" ref={this.topRef}> </div>
        {this.renderSimilar()}
      </div>
    )
  }

}

function mapStateToProps(state) {
  return {
    search: state.search,
    user: state.user
  }
}

export default connect(mapStateToProps)(SimilarMovie)
