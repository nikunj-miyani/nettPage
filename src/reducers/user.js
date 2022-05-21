import {
  USER_LOGIN_TYPE,
  USER_REGISTRATION_TYPE,
  USER_SIGNIN,
} from "./reducersType";

const initialState = { userInfo: null };

export default function user(state = initialState, action = {}) {
  switch (action.type) {
    case USER_SIGNIN: {
      return {
        ...state,
        userInfo: action.payload,
      };
    }
    case USER_LOGIN_TYPE: {
      return {
        ...state,
        userLoginType: action.payload,
      };
    }
    case USER_REGISTRATION_TYPE: {
      return {
        ...state,
        userRegistrationType: action.payload,
      };
    }
    default:
      return state;
  }
}
