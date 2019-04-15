import React from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Button from '@material-ui/core/Button';
import * as Scroll from 'react-scroll';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    margin: 'auto',
    maxWidth: 500,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
});

function SimilarMovie(props) {

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
    debugger
    window.scrollTo(0, 0) //scroll to the top of the page on click
  }

  const renderSimilar = () => {
    //tv check
    if (!!props.result.name) {
      return (
          <Paper className={classes.paper}>
            <Grid container spacing={16}>
              <Grid item>
                <ButtonBase className={classes.image}>
                  <img className={classes.img} alt="complex" src={"http://image.tmdb.org/t/p/w185/" + props.result.poster_path} />
                </ButtonBase>
              </Grid>
              <Grid item xs={12} sm container>
                <Grid item xs container direction="column" spacing={16}>
                  <Grid item xs>
                    <Typography gutterBottom variant="subtitle1">
                    {props.result.name}
                    </Typography>
                    <Typography gutterBottom>{props.result.first_air_date}</Typography>
                  </Grid>
                  <Grid item>
                    <Typography style={{ cursor: 'pointer' }}><Button variant="contained" color="primary" onClick={handleViewMovie}> View Info </Button></Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
      )
    }
    return (
      <Paper className={classes.paper}>
        <Grid container spacing={16}>
          <Grid item>
            <ButtonBase className={classes.image}>
              <img className={classes.img} alt="complex" src={"http://image.tmdb.org/t/p/w185/" + props.result.poster_path} />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={16}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                {props.result.title}
                </Typography>
                <Typography gutterBottom>{props.result.release_date}</Typography>
              </Grid>
              <Grid item>
                <Typography style={{ cursor: 'pointer' }}><Button variant="contained" color="primary" onClick={handleViewMovie}> View Info </Button></Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    )
  }

  const { classes } = props;
  return (
    <div className={classes.root}>

          {renderSimilar()}

    </div>
  );
}

function mapStateToProps(state) {
  return {
    search: state.search,
    user: state.user
  }
}

SimilarMovie.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(SimilarMovie))
// import React from 'react'
// import {connect} from 'react-redux'
// import Button from '@material-ui/core/Button';
//
// const SimilarMovie = (props) => {
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
//     window.scrollTo(0, 0) //scroll to the top of the page on click
//   }
//
//   const renderSimilar = () => {
//     //tv check
//     if (!!props.result.name) {
//       return (
//         <div className="similarMovie">
//           <h3>{props.result.name}</h3>
//           <p>{props.result.first_air_date}</p>
//           <img src={"http://image.tmdb.org/t/p/w185/" + props.result.poster_path} alt="poster" width="50" height="50"/> <br/>
//           <Button variant="contained" color="primary" onClick={handleViewMovie}> View Info </Button>
//         </div>
//       )
//     }
//     return (
//       <div className="similarMovie">
//         <h3>{props.result.title}</h3>
//         <p>{props.result.release_date}</p>
//         <img src={"http://image.tmdb.org/t/p/w185/" + props.result.poster_path} alt="poster" width="50" height="50"/> <br/>
//         <Button variant="contained" color="primary" onClick={handleViewMovie}> View Info </Button>
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
