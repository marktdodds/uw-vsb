import { symbols } from './terms.actions';

function terms(state = {
  listings: [],
  current: {},
  next: {},
  availableCourses: {}
}, action) {
  
  let newState = Object.assign({}, state);
  switch (action.type) {
    
    case symbols.RECEIVED_TERMS:
      newState.listings = Object.keys(action.response.data.listings).reduce((prev, key) => prev.concat(action.response.data.listings[key]), []);
      newState.current = Object.assign({}, newState.listings.find(el => el.id === action.response.data['current_term']));
      newState.next = Object.assign({}, newState.listings.find(el => el.id === action.response.data['next_term']));
      break;
    
    case symbols.RECEIVED_COURSES_FOR_TERM:
      newState.availableCourses[action.termId] = action.response.data.map(course => ({
        code: course['subject'] + course['catalog_number'],
        description: course['title']
      }));
      break;
    
    default:
      break;
  }
  
  return newState;
}

export default terms;
