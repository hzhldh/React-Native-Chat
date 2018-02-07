import * as types from './actiontypes';
import {loginSuccess} from "./user";

/*
Action Creators
*/

export function changeAppRoot(root) {
  return {
    type: types.ROOT_CHANGED, 
    root: root
  };
}

/*
dispatch the actionCreators 
*/

export function appInitialized() {
  return async function(dispatch, getState) {
    // since all business logic should be inside redux actions
    // this is a good place to put your app initialization code
    dispatch(changeAppRoot('login'));
  };
}

export function login(user:any) {
  return async function(dispatch, getState) {
    // login logic would go here, and when it's done, we switch app roots
    dispatch(changeAppRoot('after-login'));
    //存入登录者信息
    dispatch(loginSuccess(user))
  };
}

