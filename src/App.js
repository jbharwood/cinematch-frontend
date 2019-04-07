import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar'
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

  // state = {
  //   page: ""
  // }

  // changePage = (page) => {
  //   this.setState({page: page})
  // }

	setCurrentUser = (response) => {
		this.setState({
			currentUser: response
		})

	}

  logout = () => {
    this.props.dispatch({type: "SET_CURRENT_USER", payload: null})
	}

  // renderPage = () => {
  //   if (this.state.page === "MovieView") {
  //     return <MovieView changePage={this.changePage}/>
  //   } else if (this.state.page === "Search"){
  //     return <Search changePage={this.changePage}/>
  //   } else if (this.state.page === "") {
  //     return (
  //       <Switch>
  //         <Route path="/users/:id" render={routerProps => <Watchlist changePage={this.changePage} {...routerProps} />} />
  //         <Route path="/login" render={routerProps => <LoginForm {...routerProps} setCurrentUser={this.setCurrentUser}
  //           changePage={this.changePage} />} />
  //       </Switch>
  //     )
  //   }
  // }

  render() {
    console.log(this.props)
    return (
      <div className="App">
  			<Grid>
  				<Navbar logout={this.logout} />
  				<Grid.Row centered>
  					<Switch>
              <Route path="/watchlist" render={routerProps => <Watchlist changePage={this.changePage} {...routerProps} />} />
              <Route path="/login" render={routerProps => <LoginForm {...routerProps} setCurrentUser={this.setCurrentUser}
                changePage={this.changePage} />} />
  						<Route path="/search" render={routerProps => <Search changePage={this.changePage} {...routerProps} />} />
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
// <Route path="/signup" component={SignupForm} />
