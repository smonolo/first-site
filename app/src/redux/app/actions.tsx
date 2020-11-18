import axios, { AxiosResponse } from 'axios';

import types from './action-types';
import { AppDispatch } from './types';

interface GitCommitResponse {
  readonly success: boolean;
  readonly error?: string;
  readonly payload?: {
    readonly gitCommit: {
      readonly shortHash: string;
      readonly committer: {
        readonly name: string;
        readonly email: string;
      };
      readonly branch: string;
    };
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