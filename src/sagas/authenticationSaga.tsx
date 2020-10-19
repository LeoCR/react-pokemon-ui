import { put, call } from 'redux-saga/effects';
import { loginByUsernameRequest,loginByEmailRequest } from '../api/api';
import { LOGIN_BY_EMAIL, LOGIN_BY_USERNAME } from '../constants/userTypes';

export function* loginByEmailSaga(payload:any) {
    try {
        const response = yield call(loginByEmailRequest(payload.user));
        yield put({ type: LOGIN_BY_EMAIL.SUCCESS, response });
    } 
    catch(error) {
        yield put({ type: LOGIN_BY_EMAIL.FAIL, error })
    }
}

export function* loginByUsernameSaga(payload:any) {
    try {
        const response = yield call(loginByUsernameRequest(payload.user));
        yield put({ type: LOGIN_BY_USERNAME.SUCCESS, response });
    } 
    catch(error) {
        yield put({ type: LOGIN_BY_USERNAME.FAIL, error })
    }
}