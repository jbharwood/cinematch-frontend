const initialState =  {
  search: "",
  watchlist: [],
  viewMovie: null,
  movieInfo: null,
  user: null,
  badData: false,
  history: []
}

function reducer(state=initialState, action){
  switch (action.type) {
    case "SEARCH_MOVIES":
      return {...state, search: action.payload}
    case "WATCH_MOVIE":
      return {...state, watchlist: [...state.watchlist, action.payload]}
    case "VIEW_MOVIE":
      return {...state, viewMovie: action.payload}
    case "SET_CURRENT_USER":
      return {...state, user: action.payload}
    case "FETCH_MOVIE":
      fetchMovieInfo(action.payload)
    default:
      return state
  }
}

function fetchMovieInfo(movie) {
  fetch(`https://api.themoviedb.org/3/find/${movie.imdbID}?api_key=3eb68659d6134fa388c1a0220feb7fd1&external_source=imdb_id`)
  .then(r => r.json())
  .then(r => {
    if (r.movie_results.length !== 0) {
      debugger
      this.setState({movieInfo: r.movie_results[0]})
    } else if (r.tv_results.length !== 0) {
      this.setState({movieInfo: r.tv_results[0]})
    } else {
      this.setState({badData: true})
    }
  })
}

export default reducer
