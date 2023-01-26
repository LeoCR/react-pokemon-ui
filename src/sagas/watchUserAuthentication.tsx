import { takeLatest } from 'redux-saga/effects';
import { loginByUsernameSaga,loginByEmailSaga } from './authenticationSaga';
import {LOGIN_BY_EMAIL, LOGIN_BY_USERNAME} from "../constants/userTypes";

export  function* watchUserAuthenticationByEmail() { 
  yield takeLatest(LOGIN_BY_EMAIL.LOAD, loginByEmailSaga);
}
export  function* watchUserAuthenticationByUsername() { 
    yield takeLatest(LOGIN_BY_USERNAME.LOAD, loginByUsernameSaga); 
}