import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar'
import Search from './components/Search'
import MovieView from './components/MovieView'
import Watchlist from './components/Watchlist'
import LoginForm from './components/LoginForm'
import SignUpForm from './components/SignUpForm'
import Feed from './components/Feed'
import 'semantic-ui-css/semantic.min.css';
import {connect} from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import { Grid } from 'semantic-ui-react'

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
    this.props.dispatch({type: "SET_CURRENT_USER", payload: null})
		this.setState({
			currentUser: null
		}, () => { this.props.history.push("/login") })
	}

	componentDidMount() {
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

  render() {
		console.log("currentUser: ", this.state.currentUser);
    return (
      <div className="App">
      <h1>Cinematch</h1>
  			<Grid>
  				<Navbar currentUser={this.state.currentuser} logout={this.logout} />
  				<Grid.Row centered>
  					<Switch>
              <Route path="/watchlist" render={routerProps => <Watchlist changePage={this.changePage} {...routerProps} />} />
              <Route path="/login" render={routerProps => <LoginForm {...routerProps} setCurrentUser={this.setCurrentUser}
                changePage={this.changePage} />} />
              <Route path="/signup" render={routerProps => <SignUpForm {...routerProps} setCurrentUser={this.setCurrentUser}
                changePage={this.changePage} />} />
  						<Route path="/search" render={routerProps => <Search changePage={this.changePage} {...routerProps} />} />
  						<Route path="/chatbox" render={routerProps => <Feed changePage={this.changePage} {...routerProps} />} />
  					</Switch>
  				</Grid.Row>
  			</Grid>
      </div>

    );
  }
}

function mapStateToProps(state){
  return {
    viewMovie: state.viewMovie
  }
}

export default connect(mapStateToProps)(App);
