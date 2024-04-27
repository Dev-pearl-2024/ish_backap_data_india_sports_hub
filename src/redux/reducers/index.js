import { combineReducers } from 'redux';
import authReducer from './authReducer';
import userReducer from './userReducer';
import sportReducer from './sportsReducer';

const rootReducer = combineReducers({
  auth: authReducer, 
  user: userReducer, 
  sport: sportReducer
});

export default rootReducer;