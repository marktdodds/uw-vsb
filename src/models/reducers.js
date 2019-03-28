import { combineReducers } from 'redux';
import navigation from './navigation/navigation.reducer';
import courses from './courses/courses.reducer';
import terms from './terms/terms.reducer'
const allReducers = combineReducers({
  navigation,
  courses,
  terms
});

export default allReducers
