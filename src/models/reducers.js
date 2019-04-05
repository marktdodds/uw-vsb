import { combineReducers } from 'redux';
import navigation from './navigation/navigation.reducer';
import courses from './courses/courses.reducer';
import terms from './terms/terms.reducer';
import builder from './builder/builder.reducer';
const allReducers = combineReducers({
  navigation,
  courses,
  terms,
  builder
});

export default allReducers
