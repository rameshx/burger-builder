import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth store', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      error: null,
      loading: false,
      token: null,
      userId: null,
      autoRedirectPath: '/'
    })
  })
  it('should store the token upon login', () => {
    expect(reducer(undefined, {
      type: actionTypes.AUTH_SUCCESS,
      token: 'token',
      userId: 'userId'
    })).toEqual({
      error: null,
      loading: false,
      token: 'token',
      userId: 'userId',
      autoRedirectPath: '/'
    })
  })
})