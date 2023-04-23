import { Dispatch } from "redux";
import { History } from "history";
import {
  LOGOUT,
  SET_CURRENT_USER,
  CLEAR_USER_ERRORS,
  GET_USER_ERRORS,
  LOGIN_BY_EMAIL,
  LOGIN_BY_USERNAME,
} from "../constants/userTypes";
import { api } from "../api/api";
import {
  LoginRequestByEmail,
  LoginRequestByUsername,
  User,
} from "../interfaces/Security.interface";

export const createNewUser =
  (newUser: User, history: History) => async (dispatch: Dispatch) => {
    try {
      await api
        .post("/api/create/user", newUser)
        .then((res) => {
          if (res.data) {
            history.push("/login");
            dispatch({
              type: CLEAR_USER_ERRORS,
            });
          }
        })
        .catch((err: Error) => {
          console.error("An error occurs createNewUser await.post.catch", err);
          dispatch({
            type: GET_USER_ERRORS,
            payload: err,
          });
        });
    } catch (error) {
      console.error("An error occurs createNewUser try.catch", error);
      dispatch({
        type: GET_USER_ERRORS,
        payload: error,
      });
    }
  };
export const loginByEmail = (LoginRequest: LoginRequestByEmail) => {
  return {
    type: LOGIN_BY_EMAIL.LOAD,
    user: LoginRequest,
  };
};
export const loginByUsername = (LoginRequest: LoginRequestByUsername) => {
  return {
    type: LOGIN_BY_USERNAME.LOAD,
    user: LoginRequest,
  };
};
export const setUserData = (tokenDecoded: string | unknown) => {
  return {
    type: SET_CURRENT_USER,
    payload: tokenDecoded,
  };
};
export const logout = () => {
  return {
    type: LOGOUT,
  };
};
