import React from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    margin: 'auto',
    maxWidth: 300,
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

function SearchResult(props) {

  const handleViewMovie = () => {
    props.dispatch({type: "VIEW_MOVIE", payload: props.result})
    props.changePage("MovieView")
  }

  const { classes } = props;
  return (
    <div className={classes.root} onClick={handleViewMovie} style={{ cursor: 'pointer' }}>
      <Paper className={classes.paper}>
        <Grid container spacing={16}>
          <Grid item>
            <ButtonBase className={classes.image}>
              <img className={classes.img} alt="complex" src={props.result.Poster} />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={16}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  {props.result.Title}
                </Typography>
                <Typography gutterBottom>{props.result.Year}</Typography>
                <Typography color="textSecondary">{props.result.release_date}</Typography>
              </Grid>
              <Grid item>
                <Typography style={{ cursor: 'pointer' }}><Button variant="contained" color="primary" onClick={handleViewMovie}> View Info </Button></Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    search: state.search
  }
}

SearchResult.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(SearchResult))

// import React from 'react'
// import {connect} from 'react-redux'
// import Button from '@material-ui/core/Button';
//
// const SearchResult = (props) => {
//
//   const handleViewMovie = () => {
//     props.dispatch({type: "VIEW_MOVIE", payload: props.result})
//     props.changePage("MovieView")
//   }
//
//   return (
//     <div className="searchResult">
//       <h3>{props.result.Title}</h3>
//       <p>{props.result.release_date}</p>
//       <img src={props.result.Poster} alt="poster" width="50" height="50"/> <br/>
//       <Button variant="contained" color="primary" onClick={handleViewMovie}> View Info </Button>
//     </div>
//   )
// }
//
// function mapStateToProps(state) {
//   return {
//     search: state.search
//   }
// }
//
// export default connect(mapStateToProps)(SearchResult)
