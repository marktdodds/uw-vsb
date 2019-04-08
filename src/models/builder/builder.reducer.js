import { symbols } from './builder.actions';

function builder(state = {
  courses: [],
  possibleCombinations: []
}, action) {
  
  let newState = Object.assign({}, state);
  let updateCombinations = false;
  
  switch (action.type) {
    
    case symbols.ADD_COURSE:
      if (!newState.courses.includes(action.course)) {
        newState.courses.push(action.course);
        updateCombinations = true;
      }
      break;
    
    default:
      break;
  }
  
  if (updateCombinations) {
  
  
  
  }
  
  return newState;
}

export default builder;
