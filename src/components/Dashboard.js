import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import Search from './Search'
import Home from './Home'
import Watchlist from './Watchlist'
import LoginForm from './LoginForm'
import SignUpForm from './SignUpForm'
import Feed from './Feed'
import { Switch, Route } from 'react-router-dom'
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import HomeIcon from '@material-ui/icons/Home';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import LoginIcon from '@material-ui/icons/Person';
import PeopleIcon from '@material-ui/icons/People';
import MovieIcon from '@material-ui/icons/Movie';
import SignUpIcon from '@material-ui/icons/PersonAdd';
import AssignmentIcon from '@material-ui/icons/Assignment';
import SearchIcon from '@material-ui/icons/Search';
import ChatIcon from '@material-ui/icons/Chat';


const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto',
  },
  chartContainer: {
    marginLeft: -22,
  },
  tableContainer: {
    height: 320,
  },
  h5: {
    marginBottom: theme.spacing.unit * 2,
  },
});

class Dashboard extends React.Component {
  state = {
    open: true,
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  logout = () => {
    this.props.logout()
    localStorage.clear()
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="absolute"
          className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
        >
          <Toolbar disableGutters={!this.state.open} className={classes.toolbar}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(
                classes.menuButton,
                this.state.open && classes.menuButtonHidden,
              )}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}
            >
              Cinematch
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
          }}
          open={this.state.open}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
            {this.props.user || this.props.currentUser
              ?
                <div>
                  <ListItem button component={Link} to="/home">
                    <ListItemIcon>
                      <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                  </ListItem>
                  <ListItem button component={Link} to="/search">
                    <ListItemIcon>
                      <SearchIcon />
                    </ListItemIcon>
                    <ListItemText primary="Search" />
                  </ListItem>
                  <ListItem button component={Link} to="/watchlist">
                    <ListItemIcon>
                      <MovieIcon />
                    </ListItemIcon>
                    <ListItemText primary="Watchlist" />
                  </ListItem>
                  <ListItem button component={Link} to="/chatbox">
                    <ListItemIcon>
                      <ChatIcon />
                    </ListItemIcon>
                    <ListItemText primary="Chatbox" />
                  </ListItem>
                  <ListItem button component={Link} to="/login" onClick={this.logout}>
                    <ListItemIcon>
                      <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText primary="Log Out" />
                  </ListItem>
                </div>
              :
                <div>
                  <ListItem button component={Link} to="/login">
                    <ListItemIcon>
                      <LoginIcon />
                    </ListItemIcon>
                    <ListItemText primary="Log In" />
                  </ListItem>
                  <ListItem button component={Link} to="/signup">
                    <ListItemIcon>
                      <SignUpIcon />
                    </ListItemIcon>
                    <ListItemText primary="Sign Up" />
                  </ListItem>
                </div>
            }
          </List>
          <Divider />
        </Drawer>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Typography variant="h4" gutterBottom component="h2">
            <Switch>
            <Route path="/home" render={routerProps => <Home changePage={this.props.changePage} {...routerProps} />} />
            <Route path="/watchlist" render={routerProps => <Watchlist changePage={this.props.changePage} {...routerProps} />} />
            <Route path="/login" render={routerProps => <LoginForm {...routerProps} setCurrentUser={this.props.setCurrentUser}
              changePage={this.props.changePage} />} />
            <Route path="/signup" render={routerProps => <SignUpForm {...routerProps} setCurrentUser={this.props.setCurrentUser}
              changePage={this.props.changePage} />} />
            <Route path="/search" render={routerProps => <Search changePage={this.props.changePage} {...routerProps} />} />
            <Route path="/chatbox" render={routerProps => <Feed changePage={this.props.changePage} {...routerProps} />} />
            </Switch>
          </Typography>
          <Typography component="div" className={classes.chartContainer}>
          </Typography>
          <Typography variant="h4" gutterBottom component="h2">

          </Typography>
          <div className={classes.tableContainer}>
          </div>
        </main>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state){
  return {
    user: state.user,
  }
}

export default connect(mapStateToProps)(withStyles(styles)(Dashboard))
