import { combineReducers } from 'redux';
import navigation from './navigation/navigation.reducer';
import courses from './courses/courses.reducer';

const allReducers = combineReducers({
  navigation,
  courses
});

export default allReducers
