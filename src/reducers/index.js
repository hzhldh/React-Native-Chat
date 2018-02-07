import {root} from './rootReducer';
import user from "./userReducer";
import session from "./sessionReducer";

/*
This file exports the reducers as an object which
will be passed onto combineReducers method at src/app.js
*/
export default {
  root,
  user,
  session,
}