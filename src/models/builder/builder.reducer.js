import { symbols } from './builder.actions';

function builder(state = {
  courses: []
}, action) {
  
  let newState = Object.assign({}, state);
  
  switch (action.type) {
    
    case symbols.ADD_COURSE:
      if (!newState.courses.includes(action.course))
        newState.courses.push(action.course);
      break;
    
    default:
      break;
  }
  
  return newState;
}

export default builder;
