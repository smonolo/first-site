import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

export type State = {
  logged: boolean,
  username: string,
  jwt: string
};

export type Action = {
  type: string,
  payload?: State
};

export type Dispatch = (action: Action) => void;

const initialState = {
  logged: false,
  username: '',
  jwt: ''
};

const types = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT'
};

const reducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case types.LOGIN:
      if (action.payload) {
        return { ...action.payload };
      } else {
        return state;
      }
    case types.LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export const getAuth = (state: State) => ({
  logged: state.logged, username: state.username
});
export const isLogged = (state: State) => state.logged;
export const getUsername = (state: State) => state.username;

const middleware = applyMiddleware(thunk);

export const store = createStore(reducer, initialState, middleware);