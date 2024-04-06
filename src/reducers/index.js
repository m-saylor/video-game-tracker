// the starting point for your redux store
// this defines what your store state will look like
import { combineReducers } from '@reduxjs/toolkit';
import postsReducer from './posts-reducer';
import authReducer from './auth-reducer';
import errorReducer from './error-reducer';

const rootReducer = combineReducers({
  posts: postsReducer,
  auth: authReducer,
  error: errorReducer,
});

export default rootReducer;