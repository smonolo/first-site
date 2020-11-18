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
import { appReducer, appInitialState, AppState } from './app';

export interface StoreState {
  readonly auth: AuthState;
  readonly admin: AdminState;
  readonly app: AppState;
}

const reducers: Reducer<CombinedState<StoreState>> = combineReducers({
  auth: authReducer,
  admin: adminReducer,
  app: appReducer
});

const initialStoreState: StoreState = {
  auth: authInitialState,
  admin: adminInitialState,
  app: appInitialState
};

const middleware: StoreEnhancer = applyMiddleware(thunk);

export const store: Store = createStore(reducers, initialStoreState, middleware);