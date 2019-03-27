import {combineReducers} from 'redux';
import navigationReducer from './navigation/navigation.reducer';

const allReducers = combineReducers({
  navigationReducer
})

export default allReducers
