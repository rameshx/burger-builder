import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  error: null,
  loading: false,
  token: null,
  userId: null,
  autoRedirectPath: '/'
};

const authFail = (state, action) => {
  return updateObject(state, { loading: false, error: action.error });
}

const authStart = (state, action) => {
  return updateObject(state, { loading: true, error: null });
}

const authSuccess = (state, action) => {
  return updateObject(state, { loading: false, error: null, token: action.token, userId: action.userId });
}

const logout = (state, action) => {
  return updateObject(state, { token: null, userId: null })
}

const setAutoRedirectPath = (state, action) => {
  return updateObject(state, { autoRedirectPath: action.path })
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.AUTH_FAIL: return authFail(state, action);
    case actionTypes.AUTH_START: return authStart(state, action);
    case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
    case actionTypes.LOGOUT: return logout(state, action);
    case actionTypes.SET_AUTO_REDIRECT_PATH: return setAutoRedirectPath(state, action);
    default: return state
  }
}

export default reducer;