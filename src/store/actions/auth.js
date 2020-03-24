import * as actionTypes from './actionTypes';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
}

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
    userId: userId
  }
}

export const authFailed = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error
  }
}

export const logout = () => {
  return { type: actionTypes.AUTH_INITIATE_LOGOUT };
}

export const logoutSucceed = () => {
  return { type: actionTypes.LOGOUT };
}

export const autoLogout = (expirationTime) => {
  return {type: actionTypes.AUTH_AUTO_LOGOUT, expirationTime};
}

export const auth = (email, password, isSignup) => {
  return {
    type: actionTypes.AUTH_USER,
    email,
    password,
    isSignup
  };
}

export const setAutoRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTO_REDIRECT_PATH,
    path
  }
}

export const checkAuthState = () => {
  return {
    type: actionTypes.AUTH_CHECK_STATE
  };
}