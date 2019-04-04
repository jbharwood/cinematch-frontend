import React, { Component } from 'react';
import './App.css';
import NavHeader from './components/Header'
import Search from './components/Search'
import Movies from './components/Movies'
// import 'semantic-ui-css/semantic.min.css';
import {connect} from 'react-redux'

console.log('connect function', connect({hello: 'world'}))

class App extends Component {

  fetchMovieInfo = () => {
    if (this.props.viewMovie !== "") {
      debugger
    }
  }

  render() {
    console.log(this.props)
    return (
      <div className="App">
        <NavHeader />
        <Search />
        <Movies />
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
