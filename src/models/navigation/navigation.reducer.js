import { symbols, actions } from './navigation.actions';

function navigationReducer(state = {}, action) {
  
  let newState = Object.assign({}, state);
  
  switch (action.type) {
    default:
      break;
  }
  
  return newState;
}

export default navigationReducer;
