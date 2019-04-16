// import React from 'react'
// import {connect} from 'react-redux'
// import HomeMovie from './HomeMovie'
// import MovieView from './MovieView'
// import Button from '@material-ui/core/Button';
//
// class Home extends React.Component {
//
//   state = {
//     list: [],
//     viewMovieCheck: false,
//     viewMovie: null
//   }
//
//   fetchHome = () => {
//     let id = this.props.user.id
//     if (this.props.user === null) {
//       this.props.history.push(`/`)
//       return null
//     } else if (!!this.props.clickedUserID) {
//       id = this.props.clickedUserID
//     }
//     fetch(`http://localhost:3000/users/${id}`)
//     .then(r => r.json())
//     .then(r => {
//       if (!!r.watchlist) {
//         let newArr = []
//         r.watchlist.map(result => {
//           if (result.watched !== true) {
//             newArr.push(result)
//           }
//         })
//         this.setState({list: newArr})
//       } else {
//         return null
//       }
//     })
//   }
//
//   fetchFilteredHome = () => {
//     fetch(`http://localhost:3000/users/${this.props.user.id}`)
//     .then(r => r.json())
//     .then(r => {
//       let newArr = []
//       r.watchlist.map(result => {
//         if (result.watched === true) {
//           newArr.push(result)
//         }
//       })
//       this.setState({list: newArr})
//     })
//   }
//
//   changeViewMovie = (movie) => {
//     this.setState({viewMovieCheck: true})
//   }
//
//   changeToHome = () => {
//     if (this.state.filtered === true) {
//       this.setState({viewMovieCheck: false})
//     } else {
//       this.setState({viewMovieCheck: false})
//       this.fetchHome()
//     }
//   }
//
//   handleBackButton = () => {
//     this.props.dispatch({type: "CHANGE_CHATBOX_PAGE", payload: "Chatbox"})
//   }
//
//   renderBackButton = () => {
//     if (!!this.props.clickedUserID) {
//       return (
//         <div className="watchlistBackButton">
//           <Button variant="contained" color="primary" onClick={this.handleBackButton}>Go Back</Button> <br/>
//         </div>
//       )
//     }
//   }
//
//   renderList = () => {
//     if (!!this.props.clickedUserID && this.state.viewMovieCheck === false) {
//         return this.state.filteredList.map(l => {
//           return (
//             <div className="watchlist">
//               <HomeMovie changeList={this.changeList}
//                 movie={l} changeViewMovie={this.changeViewMovie}
//                 clickedUserID={this.props.clickedUserID}/>
//             </div>
//           )
//         })
//     } else if (this.state.viewMovieCheck === true) {
//       return (
//         <div className="movieView">
//           <MovieView changeToHome={this.changeToHome}/>
//         </div>
//       )
//     }
//   }
//
//   componentDidMount = () => {
//     if (!!this.props.user) {
//       this.fetchHome()
//     }
//   }
//
//   render() {
//     return (
//       <div className="watchlist">
//         {this.renderBackButton()}
//         {this.renderList()}
//       </div>
//     )
//   }
// }
//
// function mapStateToProps(state){
//   return {
//     user: state.user
//   }
// }
//
// export default connect(mapStateToProps)(Home)
