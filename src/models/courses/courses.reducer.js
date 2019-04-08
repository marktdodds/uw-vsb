import { symbols } from './courses.actions';
import helpers from '../../common/helpers'

function courses(state = {
}, action) {
  
  let newState = Object.assign({}, state);
  
  switch (action.type) {
    
    case symbols.RECEIVED_COURSE_INFORMATION:
      helpers.createObjectPath(newState, action.response.data['subject'], action.response.data['catalog_number']);
      newState[action.response.data['subject']][action.response.data['catalog_number']] = action.response.data;
      break;
      
    default:
      break;
  }
  
  return newState;
}

export default courses;
