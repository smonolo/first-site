import { Reducer } from 'redux';

import { AppState, AppAction } from './types';
import types from './action-types';

export const appInitialState: AppState = {
  gitCommit: {
    shortHash: '',
    hash: '',
    subject: '',
    committedOn: '',
    committer: {
      name: '',
      email: ''
    },
    branch: ''
  }
};

export const appReducer: Reducer = (state: AppState = appInitialState, action: AppAction) => {
  switch (action.type) {
    case types.FETCH_COMMIT:
      return { ...action.payload };

    default:
      return state;
  }
};