import { Selector } from 'react-redux';

import { StoreState } from '../store';

export const getApp: Selector<StoreState, any> = state => state.app;
export const getGitCommit: Selector<StoreState, any> = state => state.app.gitCommit;