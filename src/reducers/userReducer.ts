/* eslint-disable import/no-anonymous-default-export */
import { Action } from "redux";
import {
  LOGIN_BY_EMAIL,
  LOGIN_BY_USERNAME,
  LOGOUT,
  SET_CURRENT_USER,
} from "../constants/userTypesConstants";
import { setJWTToken } from "../utils/setJWTToken";
interface UserActions extends Action {
  response: object;
  error: {
    message?: object | string | null;
  };
  payload: object;
}
export interface userState {
  user: object;
  validToken: boolean;
  error: null | object | string;
}
const initialState: userState = {
  user: {},
  validToken: false,
  error: null,
};

const booleanActionPayload = (payload: object) => {
  if (payload) {
    return true;
  } else {
    return false;
  }
};

export default function (state = initialState, action: UserActions) {
  switch (action.type) {
    case LOGIN_BY_USERNAME.SUCCESS:
      return {
        ...state,
        user: action.response,
        validToken: true,
      };
    case LOGIN_BY_USERNAME.FAIL:
      return {
        ...state,
        validToken: false,
        error: action.error.message,
      };
    case LOGIN_BY_EMAIL.SUCCESS:
      return {
        ...state,
        user: action.response,
        validToken: true,
      };
    case LOGIN_BY_EMAIL.FAIL:
      return {
        ...state,
        validToken: false,
        error: action.error.message,
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        user: action.payload,
        validToken: booleanActionPayload(action.payload),
      };
    case LOGOUT:
      localStorage.removeItem("jwtToken");
      setJWTToken(false);
      return {
        ...state,
        user: {},
        validToken: false,
      };
    default:
      return { ...state };
  }
}
