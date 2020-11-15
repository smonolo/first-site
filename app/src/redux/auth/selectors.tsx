import { Selector } from 'react-redux';

import { StoreState } from '../store';

export const getAuth: Selector<StoreState, any> = state => state.auth;