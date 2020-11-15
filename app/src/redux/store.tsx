import {
  applyMiddleware,
  createStore,
  combineReducers,
  StoreEnhancer,
  Store,
  CombinedState,
  Reducer
} from 'redux';
import thunk from 'redux-thunk';

import { authReducer, authInitialState, AuthState } from './auth';
import { adminReducer, adminInitialState, AdminState } from './admin';

// interface is readonly
export interface StoreState {
  readonly auth: AuthState;
  readonly admin: AdminState;
}

const reducers: Reducer<CombinedState<StoreState>> = combineReducers({
  auth: authReducer,
  admin: adminReducer
});

const initialStoreState: StoreState = {
  auth: authInitialState,
  admin: adminInitialState
};

const middleware: StoreEnhancer = applyMiddleware(thunk);

export const store: Store = createStore(reducers, initialStoreState, middleware);