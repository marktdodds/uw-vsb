import { symbols } from './courses.actions';

function coursesReducer(state = {}, action) {
  
  let newState = Object.assign({}, state);
  
  switch (action.type) {
    
    default:
      break;
  }
  
  return newState;
}

export default coursesReducer;
