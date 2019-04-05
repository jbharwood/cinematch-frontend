import React, { Component } from 'react';
import './App.css';
import NavHeader from './components/Header'
import Search from './components/Search'
import Movies from './components/Movies'
import MovieView from './components/MovieView'
// import 'semantic-ui-css/semantic.min.css';
import {connect} from 'react-redux'

console.log('connect function', connect({hello: 'world'}))

class App extends Component {

  state = {
    searched: false
  }

  render() {
    console.log(this.props)
    return (
      <div className="App">
        <NavHeader />
        <MovieView />
        <Search />
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
