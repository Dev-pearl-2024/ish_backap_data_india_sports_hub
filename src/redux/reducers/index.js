import {combineReducers} from 'redux';
import authReducer from './authReducer';
import userReducer from './userReducer';
import sportReducer from './sportsReducer';
import favoriteReducer from './favoriteReducer';
import atheleteReducer from './atheleteReducer';
import eventReducer from './eventsReducer';
import scoreReducer from './scoreReducer';
const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  sport: sportReducer,
  favorite: favoriteReducer,
  atheleteReducer:atheleteReducer,
  eventReducer: eventReducer,
  scoreReducer:scoreReducer
});

export default rootReducer;
