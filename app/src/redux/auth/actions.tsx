import types from './action-types';
import { AuthDispatch, AuthState } from './types';

export const login = (payload: AuthState) => (dispatch: AuthDispatch) => {
  localStorage.setItem('jwt', payload.jwt);

  dispatch({
    type: types.LOGIN,
    payload
  });
};

export const logout = (payload: AuthState) => (dispatch: AuthDispatch) => {
  localStorage.removeItem('jwt');

  dispatch({
    type: types.LOGOUT,
    payload
  });
};