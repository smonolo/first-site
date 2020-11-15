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

// interface is readonly
export interface StoreState {
  readonly auth: AuthState;
}

const reducers: Reducer<CombinedState<StoreState>> = combineReducers({
  auth: authReducer
});

const initialStoreState: StoreState = {
  auth: authInitialState
};

const middleware: StoreEnhancer = applyMiddleware(thunk);

export const store: Store = createStore(reducers, initialStoreState, middleware);