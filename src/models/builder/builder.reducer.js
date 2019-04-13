import { symbols } from './builder.actions';
import { symbols as termsSymbols } from '../terms/terms.actions';

function builder(state = {
  courses: [],
  coursesChanged: false,
}, action) {
  
  let newState = Object.assign({}, state);
  newState.coursesChanged = false;
  
  switch (action.type) {
    
    case symbols.ADD_COURSE: {
      if (!newState.courses.includes(action.course)) {
        newState.courses.push({...action.course, enabled: true});
        newState.coursesChanged = true;
      }
      break;
    }
    
    case symbols.REMOVE_COURSE: {
      let index = newState.courses.indexOf(action.course);
      if (index !== -1) {
        newState.courses.splice(index, 1);
        newState.coursesChanged = true;
      }
      break;
    }
    
    case symbols.ENABLE_COURSE: {
      let index = newState.courses.indexOf(action.course);
      if (index !== -1) {
        newState.courses[index].enabled = true;
        newState.coursesChanged = true;
      }
      break;
    }
    
    case symbols.DISABLED_COURSE: {
      let index = newState.courses.indexOf(action.course);
      if (index !== -1) {
        newState.courses[index].enabled = false;
        newState.coursesChanged = true;
      }
      break;
    }
    
    case termsSymbols.RECEIVED_COURSE_SCHEDULE_FOR_TERM: {
      newState.coursesChanged = true;
      break;
    }
    
    default:
      break;
  }
  
  return newState;
}

export default builder;
