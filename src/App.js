import React, { Component } from 'react';
import './App.css';
import Dashboard from './components/Dashboard'
import 'semantic-ui-css/semantic.min.css';
import {connect} from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import { Grid } from 'semantic-ui-react'
import { createStore, applyMiddleware } from 'redux'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

class App extends Component {

	state = {
		currentUser: null
	}

	setCurrentUser = (response) => {
		this.setState({
			currentUser: response
		})
	}

  logout = () => {
		localStorage.clear()
		this.deleteFromFeedUser()
    this.props.dispatch({type: "SET_CURRENT_USER", payload: null})
		this.setState({
			currentUser: null
		}, () => { this.props.history.push("/login") })
	}

	deleteFromFeedUser = () => {
		fetch(`https://cinematch-jbharwood.herokuapp.com/feed_users/${this.props.feedUser.id}`, {
      method: "DELETE"
    })
	}

	theme1 = () => {
		return {
			palette: {
				primary: {
					// light: will be calculated from palette.primary.main,
					main: this.props.primaryColor,
					// dark: will be calculated from palette.primary.main,
					// contrastText: will be calculated to contrast with palette.primary.main
				},
				secondary: {
					light: '#0066ff',
					main: '#0044ff',
					// dark: will be calculated from palette.secondary.main,
					contrastText: '#ffcc00',
				},
				// error: will use the default color
			},
		}
	}

	componentDidMount() {
		const jwt = localStorage.getItem('jwt')
		if (jwt){
			fetch("https://cinematch-jbharwood.herokuapp.com/auto_login", {
				headers: {
					"Authorization": jwt
				}
			})
				.then(res => res.json())
				.then((response) => {
					if (response.errors) {
						alert(response.errors)
					} else {
						this.setState({currentUser: response})
						this.props.dispatch({type: "SET_CURRENT_USER", payload: response})
					}
				})
		}
	}

  render() {
    return (
      <div className="App">
			<MuiThemeProvider theme={createMuiTheme(this.theme1())}>

				<Dashboard currentUser={this.state.currentuser} logout={this.logout} changePage={this.changePage}
					setCurrentUser={this.setCurrentUser} setPrimaryColor={this.props.setPrimaryColor}/>
			</MuiThemeProvider>,
			</div>
    );
  }
}

// var defaultColor = "#323232"

function mapStateToProps(state){
  return {
    viewMovie: state.viewMovie,
		user: state.user,
		users: state.users,
		feedUser: state.feedUser,
		isHidden: state.isHidden,
		primaryColor: state.primaryColor
  }
}

export default connect(mapStateToProps)(App);
