import { combineReducers } from 'redux';
import auth from './auth';
import router from './router';
import posts from './posts';

export default combineReducers({
  auth,
  router,
  posts
});
