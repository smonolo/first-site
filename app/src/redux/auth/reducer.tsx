import { Reducer } from 'redux';

import { AuthState, AuthAction } from './types';
import types from './action-types';

export const authInitialState: AuthState = {
  logged: false,
  username: '',
  jwt: ''
};

export const authReducer: Reducer = (state: AuthState = authInitialState, action: AuthAction) => {
  switch (action.type) {
    case types.LOGIN:
      if (action.payload) {
        return { ...action.payload };
      } else {
        return state;
      }

    case types.LOGOUT:
      return authInitialState;

    default:
      return state;
  }
};