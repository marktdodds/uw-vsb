import { symbols } from './courses.actions';

function courses(state = {}, action) {
  
  let newState = Object.assign({}, state);
  
  switch (action.type) {
    
    case symbols.RECEIVED_COURSE_SCHEDULE:
      console.log(action.data);
      break;
    
    default:
      break;
  }
  
  return newState;
}

export default courses;
