import React, { Component } from 'react';
import './App.css';
import NavHeader from './components/Header'
import Search from './components/Search'
import MovieView from './components/MovieView'
import Watchlist from './components/Watchlist'
// import 'semantic-ui-css/semantic.min.css';
import {connect} from 'react-redux'

console.log('connect function', connect({hello: 'world'}))

class App extends Component {

  state = {
    searched: ""
  }

  changePage = (page) => {
    this.setState({searched: page})
  }

  renderPage = () => {
    if (this.state.searched === "MovieView") {
      return <MovieView changePage={this.changePage}/>
    } else if ("Search"){
      return <Search changePage={this.changePage}/>
    }
  }

  render() {
    console.log(this.props)
    return (
      <div className="App">
        <NavHeader />
        <Watchlist changePage={this.changePage} />
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
