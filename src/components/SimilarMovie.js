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
//
//
// import React from 'react'
// import {connect} from 'react-redux'
// import Button from '@material-ui/core/Button';
//
// const SimilarMovie = (props) => {
//
//   const Stateless = ({props}) => (
//     this.topRef = React.createRef()   // Create a ref for scrolling
//   );
//
//   // constructor(props) {
//   //   super(props)
//   //   this.topRef = React.createRef()   // Create a ref for scrolling
//   // }
//
//   const handleViewMovie = () => {
//     if (props.clicked === true) {
//       props.changeWatchButton()
//     }
//     let media = "movie"
//     if (!!props.result.name) {
//       media = "tv"
//     }
//     props.dispatch({type: "VIEW_MOVIE", payload: props.result})
//     props.fetchWithOMDBId(props.result.id, media)
//     // let page = document.querySelector(".Dashboard-content-12")
//     // page.scrollTo(0, 0)
//     let p = document.querySelector(".top")
//     p.scrollTo(0, this.topRef.current.offsetTop - 80)
//   }
//
//   const renderSimilar = () => {
//     //tv check
//     if (!!props.result.name) {
//       return (
//         <div className="watchlistMovie" style={{ cursor: 'pointer' }} onClick={handleViewMovie}>
//         <div className="top" ref={this.topRef}> </div>
//           <h2>{props.result.name}</h2>
//           <p>{props.result.first_air_date.slice(0,4)}</p>
//           <img src={"http://image.tmdb.org/t/p/w185/" + props.result.poster_path} alt="poster" width="150" height="150"/> <br/>
//         </div>
//       )
//     }
//     return (
//       <div className="watchlistMovie" style={{ cursor: 'pointer' }} onClick={handleViewMovie}>
//       <div className="top" ref={this.topRef()}> </div>
//         <h2>{props.result.title}</h2>
//         <p>{props.result.release_date.slice(0,4)}</p>
//         <img src={"http://image.tmdb.org/t/p/w185/" + props.result.poster_path} alt="poster" width="150" height="150"/> <br/>
//       </div>
//     )
//   }
//
//   return (
//     <div>
//       {renderSimilar()}
//     </div>
//   )
//
// }
//
// function mapStateToProps(state) {
//   return {
//     search: state.search,
//     user: state.user
//   }
// }
//
// export default connect(mapStateToProps)(SimilarMovie)


// import React from 'react';
// import {connect} from 'react-redux'
// import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
// import Grid from '@material-ui/core/Grid';
// import Paper from '@material-ui/core/Paper';
// import Typography from '@material-ui/core/Typography';
// import ButtonBase from '@material-ui/core/ButtonBase';
// import Button from '@material-ui/core/Button';
//
// const styles = theme => ({
//   root: {
//     flexGrow: 1,
//   },
//   paper: {
//     padding: theme.spacing.unit * 2,
//     margin: 'auto',
//     maxWidth: 500,
//   },
//   image: {
//     width: 128,
//     height: 128,
//   },
//   img: {
//     margin: 'auto',
//     display: 'block',
//     maxWidth: '100%',
//     maxHeight: '100%',
//   },
// });
//
// function SimilarMovie(props) {
//
//   const handleViewMovie = () => {
//     if (props.clicked === true) {
//       props.changeWatchButton()
//     }
//     let media = "movie"
//     if (!!props.result.name) {
//       media = "tv"
//     }
//     props.dispatch({type: "VIEW_MOVIE", payload: props.result})
//     props.fetchWithOMDBId(props.result.id, media)
//     let page = document.querySelector(".Dashboard-content-12")
//     page.scrollTo(0, 0)
//     // window.scrollTo(0, 0) //scroll to the top of the page on click
//   }
//
//   const renderSimilar = () => {
//     //tv check
//     if (!!props.result.name) {
//       return (
//           <Paper className={classes.paper}>
//             <Grid container spacing={16} style={{ cursor: 'pointer' }} onClick={handleViewMovie}>
//               <Grid item>
//                 <ButtonBase className={classes.image}>
//                   <img className={classes.img} alt="complex" src={"http://image.tmdb.org/t/p/w185/" + props.result.poster_path} />
//                 </ButtonBase>
//               </Grid>
//               <Grid item xs={12} sm container>
//                 <Grid item xs container direction="column" spacing={16}>
//                   <Grid item xs>
//                     <Typography gutterBottom variant="subtitle1">
//                     {props.result.name}
//                     </Typography>
//                     <Typography gutterBottom>{props.result.first_air_date}</Typography>
//                   </Grid>
//                   <Grid item>
//                   </Grid>
//                 </Grid>
//               </Grid>
//             </Grid>
//           </Paper>
//       )
//     }
//     return (
//       <Paper className={classes.paper}>
//         <Grid container classname="watchlistMovie" spacing={16} style={{ cursor: 'pointer' }} onClick={handleViewMovie}>
//           <Grid item>
//             <ButtonBase className={classes.image}>
//               <img className={classes.img} alt="complex" src={"http://image.tmdb.org/t/p/w185/" + props.result.poster_path} />
//             </ButtonBase>
//           </Grid>
//           <Grid item xs={12} sm container>
//             <Grid item xs container direction="column" spacing={16}>
//               <Grid item xs>
//                 <Typography gutterBottom variant="subtitle1">
//                 {props.result.title}
//                 </Typography>
//                 <Typography gutterBottom>{props.result.release_date}</Typography>
//               </Grid>
//               <Grid item>
//               </Grid>
//             </Grid>
//           </Grid>
//         </Grid>
//       </Paper>
//     )
//   }
//
//   const { classes } = props;
//   return (
//     <div className={classes.root}>
//
//           {renderSimilar()}
//
//     </div>
//   );
// }
//
// function mapStateToProps(state) {
//   return {
//     search: state.search,
//     user: state.user
//   }
// }
//
// SimilarMovie.propTypes = {
//   classes: PropTypes.object.isRequired,
// };
//
// export default connect(mapStateToProps)(withStyles(styles)(SimilarMovie))
