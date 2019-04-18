import React, { Component } from 'react';
import './App.css';
// import Navbar from './components/Navbar'
import Dashboard from './components/Dashboard'
// import Search from './components/Search'
// import MovieView from './components/MovieView'
// import Watchlist from './components/Watchlist'
// import LoginForm from './components/LoginForm'
// import SignUpForm from './components/SignUpForm'
// import Feed from './components/Feed'
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
		// this.props.dispatch({type: "ADD_TO_USERS", payload: response})
	}

  logout = () => {
		// let index = this.props.users.indexOf(this.props.user);
		// this.props.dispatch({type: "REMOVE_USER_FROM_USERS", payload: index})
		localStorage.clear()
		this.deleteFromFeedUser()
    this.props.dispatch({type: "SET_CURRENT_USER", payload: null})
		this.setState({
			currentUser: null
		}, () => { this.props.history.push("/login") })
	}

	deleteFromFeedUser = () => {
		// fetch(`http://localhost:3000/feed_users/${1}`, {
		fetch(`http://localhost:3000/feed_users/${this.props.feedUser.id}`, {
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


		// var test2 = "#0066ff"

	// var theme2 =
	// 	{
	// 		palette: {
	// 			primary: {
	// 				// light: will be calculated from palette.primary.main,
	// 				main: test2,
	// 				// dark: will be calculated from palette.primary.main,
	// 				// contrastText: will be calculated to contrast with palette.primary.main
	// 			},
	// 			secondary: {
	// 				light: '#0066ff',
	// 				main: '#0044ff',
	// 				// dark: will be calculated from palette.secondary.main,
	// 				contrastText: '#ffcc00',
	// 			},
	// 			// error: will use the default color
	// 		},
	// 	}

		// theme = () => {
		// 	createMuiTheme(theme1);
		// }
		// const themea = createMuiTheme(theme2);


	// renderPic = () => {
	// 	let container = document.querySelector("div.Dashboard-tableContainer-14")
	// 	// debugger
	// 	if (container !== null && this.props.isHidden === false) {
	// 		container.innerHTML = "<img src=https://visualhunt.com/photos/1/night-television-tv-video.jpg?s=l className=mainImage width=100% height=100%>"
	// 	} else if (container !== null && this.props.isHidden === true) {
	// 		container.innerHTML = ""
	// 	}
	// }

	componentDidMount() {
		// //this.props.dispatch({type: "HIDE_APP", payload: false})
		const jwt = localStorage.getItem('jwt')
		if (jwt){
			fetch("http://localhost:3000/auto_login", {
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

	// changeThing = () => {
	// 	test = "#A22424"
	// 	test2 = "#EBDDDD"
	// 	console.log(test);
	// 	console.log(test2);
	// }

	// theme = () => {
	// 	createMuiTheme(theme1);
	// }

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

var test = "#323232"
// var test = "#323232"

// "#323232"
// var theme1 =
// 	{
// 		palette: {
// 			primary: {
// 				// light: will be calculated from palette.primary.main,
// 				main: test,
// 				// dark: will be calculated from palette.primary.main,
// 				// contrastText: will be calculated to contrast with palette.primary.main
// 			},
// 			secondary: {
// 				light: '#0066ff',
// 				main: '#0044ff',
// 				// dark: will be calculated from palette.secondary.main,
// 				contrastText: '#ffcc00',
// 			},
// 			// error: will use the default color
// 		},
// 	}
//
// 	var test2 = "#0066ff"
//
// var theme2 =
// 	{
// 		palette: {
// 			primary: {
// 				// light: will be calculated from palette.primary.main,
// 				main: test2,
// 				// dark: will be calculated from palette.primary.main,
// 				// contrastText: will be calculated to contrast with palette.primary.main
// 			},
// 			secondary: {
// 				light: '#0066ff',
// 				main: '#0044ff',
// 				// dark: will be calculated from palette.secondary.main,
// 				contrastText: '#ffcc00',
// 			},
// 			// error: will use the default color
// 		},
// 	}
//
// 	const theme = createMuiTheme(theme1);
// 	const themea = createMuiTheme(theme2);

//   render() {
//     return (
//       <div className="App">
//       <h1>Cinematch</h1>
//   			<Grid>
//   				<Dashboard currentUser={this.state.currentuser} logout={this.logout} changePage={this.changePage}/>
//   				<Grid.Row centered>
//   					<Switch>
//               <Route path="/watchlist" render={routerProps => <Watchlist changePage={this.changePage} {...routerProps} />} />
//               <Route path="/login" render={routerProps => <LoginForm {...routerProps} setCurrentUser={this.setCurrentUser}
//                 changePage={this.changePage} />} />
//               <Route path="/signup" render={routerProps => <SignUpForm {...routerProps} setCurrentUser={this.setCurrentUser}
//                 changePage={this.changePage} />} />
//   						<Route path="/search" render={routerProps => <Search changePage={this.changePage} {...routerProps} />} />
//   						<Route path="/chatbox" render={routerProps => <Feed changePage={this.changePage} {...routerProps} />} />
//   					</Switch>
//   				</Grid.Row>
//   			</Grid>
//       </div>
//
//     );
//   }
// }



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

// "#323232"

export default connect(mapStateToProps)(App);
