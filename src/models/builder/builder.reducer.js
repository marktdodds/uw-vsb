import { symbols } from './builder.actions';
import { symbols as termsSymbols } from '../terms/terms.actions'

function builder(state = {
  courses: [],
  coursesChanged: false,
}, action) {
  
  let newState = Object.assign({}, state);
  newState.coursesChanged = false;
  
  switch (action.type) {
    
    case symbols.ADD_COURSE:
      if (!newState.courses.includes(action.course)) {
        newState.courses.push(action.course);
        newState.coursesChanged = true;
      }
      break;
    
    case termsSymbols.RECEIVED_COURSE_SCHEDULE_FOR_TERM:
      newState.coursesChanged = true;
      break;
    
    default:
      break;
  }
  
  return newState;
}

export default builder;
