import { put } from 'redux-saga/effects';
import { delay } from 'redux-saga/effects';
import axios from 'axios';

import { logoutSucceed, logout, authStart, authFailed, autoLogout, authSuccess } from '../actions';

export function* logoutSaga(action) {
  yield localStorage.removeItem('token');
  yield localStorage.removeItem('expirationDate');
  yield localStorage.removeItem('userId');
  yield put(logoutSucceed());
}

export function* autoLogoutSaga(action) {
  yield delay(action.expirationTime * 1000);
  yield put(logout());
}

export function* authUserSaga(action) {
  const authData = { email: action.email, password: action.password, returnSecureToken: true };
  let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCOx_bhnm984lyKKlb1t97cB2PxbrjsUxE';
  if (!action.isSignup) {
    url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCOx_bhnm984lyKKlb1t97cB2PxbrjsUxE';
  }
  yield put(authStart());
  try {
    const response = yield axios.post(url, authData);
    const expirationDate = new Date(new Date().getTime() + (response.data.expiresIn * 1000));
    localStorage.setItem('token', response.data.idToken);
    localStorage.setItem('expirationDate', expirationDate);
    localStorage.setItem('userId', response.data.localId);
    yield put(autoLogout(response.data.expiresIn));
    yield put(authSuccess(response.data.idToken, response.data.localId));
  } catch (error) {
    yield put(authFailed(error.response.data.error))
  }
}

export function* checkAuthStateSaga(action) {
  const token = localStorage.getItem('token');
  if (!token) {
    yield put(logout());
  } else {
    const expirationDate = new Date(localStorage.getItem('expirationDate'));
    if (expirationDate <= new Date()) {
      yield put(logout())
    } else {
      yield put(authSuccess(token, localStorage.getItem('userId')));
      yield put(autoLogout((expirationDate.getTime() - new Date().getTime()) / 1000));
    }
  }
}
