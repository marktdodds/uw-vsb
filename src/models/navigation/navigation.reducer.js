import { symbols } from './navigation.actions';

function navigationReducer(state = {}, action) {
  
  let newState = Object.assign({}, state);
  
  switch (action.type) {
    
    case symbols.DUMMY_REQ:
      newState.test = 'ASD123';
      break;
    
    default:
      break;
  }
  
  return newState;
}

export default navigationReducer;
