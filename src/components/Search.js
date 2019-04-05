import React from 'react'
import {connect} from 'react-redux'
import SearchResult from './SearchResult'

class Search extends React.Component {

  state = {
    input: "",
    results: []
  }

  handleTyping = (e) => {
    this.setState({input: e.target.value})

  }

  handleSearch = (e) => {
    e.preventDefault()
    this.fetchMovies()
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

  fetchMovies = () => {
    let slug = this.slugify(this.state.input)
    fetch(`http://www.omdbapi.com/?s=${slug}&apikey=7e2663e7`)
    .then(r => r.json())
    .then(r => {
      this.setState({results: r.Search})
    })
  }

  renderSearchResults = () => {
    if (this.state.results.length > 0) {
      return this.state.results.map(r => {
        return <SearchResult result={r} changePage={this.props.changePage}/>
      })
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSearch}>
          <input type="text" onChange={this.handleTyping}/>
          <input type="submit" value="Search"/>
        </form>
        <p>{this.renderSearchResults()}</p>
      </div>
    )
  }
}

export default Search
