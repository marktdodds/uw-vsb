import { combineReducers } from 'redux';
import navigationReducer from './navigation/navigation.reducer';
import coursesReducer from './courses/courses.reducer';

const allReducers = combineReducers({
  navigationReducer,
  coursesReducer
})

export default allReducers
