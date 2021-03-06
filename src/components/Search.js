import React, { Component } from 'react'
import {connect} from 'react-redux'
import SearchResult from './SearchResult'
import MovieView from './MovieView'

class Search extends React.Component {

  constructor(props) {
    super(props)
    this.topRef = React.createRef()   // Create a ref for scrolling
  }

  state = {
    input: "",
    results: [],
    page: "Search"
  }


  handleTyping = (e) => {

    this.setState({input: e.target.value, page: "Search"})
    // e.preventDefault()
    this.fetchMovies(e.target.value)
  }

  changePage = (page) => {
    this.setState({page: page})
    // window.scrollTo(0, 0)
    document.querySelector("main").scrollTo(0,0)
  }

  slugify = (str) => {
      str = str.replace(/^\s+|\s+$/g, '') // trim
      str = str.toLowerCase()

      // remove accents, swap ñ for n, etc
      var from = "àáãäâèéëêìíïîòóöôùúüûñç·/_,:;"
      var to   = "aaaaaeeeeiiiioooouuuunc------"

      for (var i=0, l=from.length ; i<l ; i++) {
          str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i))
      }

      str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
          .replace(/\s+/g, '_') // collapse whitespace and replace by -
          .replace(/-+/g, '_') // collapse dashes

      return str;
  }

  fetchMovies = (input) => {
    let slug = this.slugify(input)
    fetch(`https://www.omdbapi.com/?s=${slug}&apikey=7e2663e7`)
    .then(r => r.json())
    .then(r => {
      if (r.Error !== "Too many results.") {
        this.setState({results: r.Search})
      }
    })
  }

  renderPage = () => {
    if (this.state.page === "Search" && !!this.state.results && this.state.results !== []) {
      return this.state.results.map(r => {
        return <SearchResult result={r} changePage={this.changePage}/>
      })
    } else if (this.state.page === "MovieView") {
      return <MovieView changePage={this.changePage}/>
    }
  }

  componentDidMount (){
    document.querySelector("main").scrollTo(0,0)
  }

  render() {
    return (
      <div>
      <div id="top" ref={this.topRef}> </div>
        <div className="searchBox">
          <form
            onKeyPress={event => {
                if (event.which === 13 /* Enter */) {
                  event.preventDefault();
                }
              }}
          >
            <input type="text" placeholder="Search..." onChange={this.handleTyping}/>
          </form>
        </div>
        <p>{this.renderPage()}</p>
      </div>
    )
  }
}

export default connect(null)(Search)
