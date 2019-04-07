import React, { Component } from 'react';
import './App.css';
import NavHeader from './components/Header'
import Search from './components/Search'
import MovieView from './components/MovieView'
import Watchlist from './components/Watchlist'
import LoginForm from './components/LoginForm'
// import SignupForm from './components/SignupForm'
// import 'semantic-ui-css/semantic.min.css';
import {connect} from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import { Grid } from 'semantic-ui-react'


console.log('connect function', connect({hello: 'world'}))

class App extends Component {

  state = {
    page: ""
  }

  changePage = (page) => {
    this.setState({page: page})
  }

  // we need to set the current user and the token
	setCurrentUser = (response) => {
		// localStorage.setItem("token", response.jwt)
		this.setState({
			currentUser: response
		})

	}

  renderPage = () => {
    if (this.state.page === "MovieView") {
      return <MovieView changePage={this.changePage}/>
    } else if (this.state.page === "Search"){
      return <Search changePage={this.changePage}/>
    } else if (this.state.page === "") {
      return (
        <Switch>
          <Route path="/users/:id" render={routerProps => <Watchlist changePage={this.changePage} {...routerProps} />} />
          <Route path="/login" render={routerProps => <LoginForm {...routerProps} setCurrentUser={this.setCurrentUser}
            changePage={this.changePage} />} />
        </Switch>
      )
    }
  }

  render() {
    console.log(this.props)
    return (
      <div className="App">
        <NavHeader />
        {this.renderPage()}
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
// <Route path="/signup" component={SignupForm} />
