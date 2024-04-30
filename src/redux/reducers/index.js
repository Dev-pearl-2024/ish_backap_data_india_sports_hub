import {combineReducers} from 'redux';
import authReducer from './authReducer';
import userReducer from './userReducer';
import sportReducer from './sportsReducer';
import favoriteReducer from './favoriteReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  sport: sportReducer,
  favorite: favoriteReducer,
});

export default rootReducer;
