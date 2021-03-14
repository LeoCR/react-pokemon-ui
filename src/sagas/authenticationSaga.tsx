import { AxiosResponse } from "axios";
import { Action } from "redux";
import { put, call } from "redux-saga/effects";
import { loginByUsernameRequest, loginByEmailRequest } from "../api/api";
import { LOGIN_BY_EMAIL, LOGIN_BY_USERNAME } from "../constants/userTypes";
import {
  LoginRequestByEmail,
  LoginRequestByUsername,
} from "../interfaces/Security.interface";
export interface PayloadUserByEmail extends Action {
  user: LoginRequestByEmail;
}
export interface PayloadUserByUsername extends Action {
  user: LoginRequestByUsername;
}
export function* loginByEmailSaga(payload: PayloadUserByEmail) {
  try {
    const response: AxiosResponse = yield call(
      loginByEmailRequest(payload.user)
    );
    yield put({ type: LOGIN_BY_EMAIL.SUCCESS, response });
  } catch (error) {
    yield put({ type: LOGIN_BY_EMAIL.FAIL, error });
  }
}

export function* loginByUsernameSaga(payload: PayloadUserByUsername) {
  try {
    const response: AxiosResponse = yield call(
      loginByUsernameRequest(payload.user)
    );
    yield put({ type: LOGIN_BY_USERNAME.SUCCESS, response });
  } catch (error) {
    yield put({ type: LOGIN_BY_USERNAME.FAIL, error });
  }
}
