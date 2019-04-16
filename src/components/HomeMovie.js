// import React from "react";
// import { Link } from 'react-router-dom'
// import {connect} from 'react-redux'
// import Button from '@material-ui/core/Button';
//
// class HomeMovie extends React.Component {
//
//   state = {
//     watched: false
//   }
//
//   handleViewMovie = () => {
//     this.props.dispatch({type: "VIEW_MOVIE", payload: this.props.movie})
//     this.props.changeViewMovie()
//   }
//
//   renderWatchButton = () => {
//     if (this.props.filtered === true) {
//       return null
//     } else {
//       return <Button variant="contained" color="primary" onClick={this.handleWatchedMovie}> Watched </Button>
//     }
//   }
//
//   renderPage = () => {
//     if (!!this.props.clickedUserID) {
//       return (
//         <div>
//           {this.props.movie.title} <br/>
//           <img src={this.props.movie.poster} alt="poster" width="50" height="50"/> <br/>
//           <Button variant="contained" color="primary" onClick={this.handleViewMovie}> View Info</Button>
//         </div>
//       )
//     } else {
//       return (
//         <div>
//           {this.props.movie.title} <br/>
//           <img src={this.props.movie.poster} alt="poster" width="50" height="50"/> <br/>
//           <Button variant="contained" color="primary" onClick={this.handleViewMovie}> View Info</Button>
//           {this.renderWatchButton()}
//           <Button variant="contained" color="primary" onClick={this.handleRemoveMovie}> Remove </Button>
//         </div>
//       )
//     }
//   }
//
//   render() {
//     return (
//       <div className="watchlistMovie">
//         {this.renderPage()}
//       </div>
//     )
//   }
//
// }
// export default connect(null)(HomeMovie)
