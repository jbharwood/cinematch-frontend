const initialState =  {
  search: "",
  watchlist: [],
  viewMovie: ""
}

function reducer(state=initialState, action){
  console.log(state)
  switch (action.type) {
    case "SEARCH_MOVIES":
        return {search: action.payload}
    case "WATCH_MOVIE":
        return {...state, watchlist: [...state.watchlist, action.payload]}
    case "VIEW_MOVIE":
        return {viewMovie: action.payload}
    default:
      return state
  }
}

export default reducer
