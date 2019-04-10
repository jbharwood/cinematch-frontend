import UUID from 'uuid';
import { POST_TO_CHATBOX } from './types';

export function addUser(movie) {
  return {
    type: ADD_USER,
    payload: { id: UUID(), movie }
  }
}

// export function updateAnimal(src) {
//   return {
//     type: UPDATE_ANIMAL,
//     payload: src,
//   }
// }

export function postMovie() {
  // does that seem cool? ehhhh
  return function(dispatch) {
    // if function , then invoke it and give it dispatch
    console.log('that is weird', dispatch);
    dispatch({ type: 'HEY_FETCHING_YO' });
    AnimalAdapter.getDog()
      .then(url => {
        // render it => update our state in redux => dispatch
        // this.props.updateAnimal(url);
        dispatch(updateAnimal(url))
        dispatch({ type: 'HEY_FETCHED_THAT_DOG' });
        // this.setState({ url });


        // // why won;'t it work?'
        // return {
        //   type: UPDATE_ANIMAL,
        //   payload: url,
        // }
      })
  }

}
