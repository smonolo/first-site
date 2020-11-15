import { Selector } from 'react-redux';

import { StoreState } from '../store';

export const getAuth: Selector<StoreState, any> = state => state.auth;
export const isLogged: Selector<StoreState, any> = state => state.auth.logged;
export const getUsername: Selector<StoreState, any> = state => state.auth.username;
export const getEmail: Selector<StoreState, any> = state => state.auth.email;
export const isSiteAdmin: Selector<StoreState, any> = state => state.auth.siteAdmin;
export const getProfile: Selector<StoreState, any> = state => ({
  id: state.auth.id,
  username: state.auth.username,
  email: state.auth.email,
  siteAdmin: state.auth.siteAdmin
});