import { Selector } from 'react-redux';

import { StoreState } from '../store';

export const getAuth: Selector<StoreState, any> = state => state.auth;
export const isLogged: Selector<StoreState, any> = state => state.auth.logged;
export const getUsername: Selector<StoreState, any> = state => state.auth.username;