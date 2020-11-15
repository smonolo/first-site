import { Selector } from 'react-redux';

import { StoreState } from '../store';

export const getAdmin: Selector<StoreState, any> = state => state.admin;
export const getUsers: Selector<StoreState, any> = state => state.admin.users;