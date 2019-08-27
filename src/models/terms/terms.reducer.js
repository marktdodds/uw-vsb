import { symbols } from './terms.actions';
import helpers from '../../common/helpers'

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
      newState.availableCourses[action.selectedTerm] = action.response.data.map(course => ({
        subject: course['subject'],
        catalog_number: course['catalog_number'],
        code: course['subject'] + course['catalog_number'],
        description: course['title']
      }));
      break;
    
    case symbols.RECEIVED_COURSE_SCHEDULE_FOR_TERM:
      helpers.createObjectPath(newState, action.selectedTerm, action.subject, action.catalog_number);
      newState[action.selectedTerm][action.subject][action.catalog_number] = action.response.data.reduce((prev, item) => {
        if (item['section'].includes('LEC')) {
          prev.lectures.push({...item});
        }
        if (item['section'].includes('TUT')) {
          prev.tutorials.push({...item});
        }
        if (item['section'].includes('TST')) {
          prev.tests.push({...item});
        }
        return prev;
      }, {
        tutorials: [],
        lectures: [],
        tests: []
      });
      break;
    
    default:
      break;
  }
  
  return newState;
}

export default terms;
