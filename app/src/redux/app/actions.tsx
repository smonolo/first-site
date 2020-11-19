import axios, { AxiosResponse } from 'axios';

import types from './action-types';
import { AppDispatch, GitCommit } from './types';

interface GitCommitResponse {
  readonly success: boolean;
  readonly error?: string;
  readonly payload?: {
    readonly gitCommit: GitCommit
  };
}

export const parseGitCommit = () => async (dispatch: AppDispatch) => {
  const request: AxiosResponse = await axios.post('/api/app', {
    auth: 'app',
    type: 'getGitCommit'
  });

  const data: GitCommitResponse = request.data;

  if (data.success && data.payload && !data.error) {
    const gitCommit = data.payload.gitCommit;

    dispatch({
      type: types.FETCH_COMMIT,
      payload: {
        gitCommit
      }
    });
  }
};