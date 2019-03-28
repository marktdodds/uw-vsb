import { symbols } from './terms.actions';

function terms(state = {
  listings: [],
  terms: {
    current: {},
    next: {},
  },
}, action) {
  
  let newState = Object.assign({}, state);
  switch (action.type) {
    
    case symbols.RECEIVED_TERMS:
      newState.listings = Object.keys(action.response.data.listings).reduce((prev, key) => prev.concat(action.response.data.listings[key]), []);
      newState.terms.current = Object.assign({}, newState.listings.find(el => el.id === action.response.data['current_term']));
      newState.terms.next = Object.assign({}, newState.listings.find(el => el.id === action.response.data['next_term']));
      break;
    
    default:
      break;
  }
  
  return newState;
}

export default terms;
