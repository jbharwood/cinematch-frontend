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
//     maxWidth: 300,
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
// function SearchResult(props) {
//
//   const handleViewMovie = () => {
//     props.dispatch({type: "VIEW_MOVIE", payload: props.result})
//     props.changePage("MovieView")
//   }
//
//   const { classes } = props;
//   return (
//     <div className={classes.root}>
//       <div className="watchlistMovie">
//       <Paper className={classes.paper}>
//         <Grid container spacing={16} style={{ cursor: 'pointer' }} onClick={handleViewMovie}>
//           <Grid item>
//             <ButtonBase className={classes.image} onClick={handleViewMovie}>
//               <img className={classes.img} alt="complex" src={props.result.Poster} />
//             </ButtonBase>
//           </Grid>
//           <Grid item xs={12} sm container onClick={handleViewMovie}>
//             <Grid item xs container direction="column" spacing={16} onClick={handleViewMovie}>
//               <Grid item xs onClick={handleViewMovie}>
//                 <Typography gutterBottom variant="subtitle1" onClick={handleViewMovie}>
//                   {props.result.Title}
//                 </Typography>
//                 <Typography gutterBottom onClick={handleViewMovie}>{props.result.Year}</Typography>
//                 <Typography color="textSecondary" onClick={handleViewMovie}>{props.result.release_date}</Typography>
//               </Grid>
//               <Grid item>
//               </Grid>
//             </Grid>
//           </Grid>
//         </Grid>
//       </Paper>
//       </div>
//     </div>
//   );
// }
//
// function mapStateToProps(state) {
//   return {
//     search: state.search
//   }
// }
//
// SearchResult.propTypes = {
//   classes: PropTypes.object.isRequired,
// };
//
// export default connect(mapStateToProps)(withStyles(styles)(SearchResult))

// <Typography style={{ cursor: 'pointer' }}><Button variant="contained" color="primary"> View Info </Button></Typography>


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

  return (
    <div className="watchlistMovie" onClick={handleViewMovie} style={{ cursor: 'pointer' }}>
      <h2>{props.result.Title}</h2>
      <p>{renderYear()}</p>
      <img src={props.result.Poster} alt="poster" width="150" height="150"/> <br/>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    search: state.search
  }
}

export default connect(mapStateToProps)(SearchResult)
