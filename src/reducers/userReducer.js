import {LOGGED_IN, LOGOUT} from "../actions/user";

const initialState={
  id: null,
  nickname: null
};

function user(state = initialState, action: any){
  switch (action.type) {
    case LOGGED_IN:
      return {
        ...state,
        ...action.user
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
}

export default user;