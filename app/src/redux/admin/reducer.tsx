import { Reducer } from 'redux';

import { AdminState, AdminAction } from './types';
import types from './action-types';

export const adminInitialState: AdminState = {
  users: []
};

export const adminReducer: Reducer = (state: AdminState = adminInitialState, action: AdminAction) => {
  switch (action.type) {
    case types.FETCH_USERS:
      return { ...action.payload };

    default:
      return state;
  }
};