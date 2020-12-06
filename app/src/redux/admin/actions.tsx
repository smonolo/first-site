import axios, { AxiosResponse } from 'axios';

import types from './action-types';
import { AdminDispatch, AdminUser } from './types';

interface RequestData {
  readonly success: boolean;
  readonly payload?: {
    readonly users: Array<AdminUser>;
  };
}

export const fetchUsers = () => async (dispatch: AdminDispatch) => {
  const request: AxiosResponse = await axios.post('http://localhost:57484/api/admin/users', {
    auth: 'adminUsers',
    type: 'getEmailsList',
    payload: {
      jwt: localStorage.getItem('jwt')
    }
  });

  const data: RequestData = request.data;

  if (data.success && data.payload) {
    dispatch({
      type: types.FETCH_USERS,
      payload: data.payload
    });
  } else {
    dispatch({
      type: types.FETCH_USERS,
      payload: {
        users: [{
          username: 'could not fetch users',
          email: '',
          siteAdmin: false,
          banned: false
        }]
      }
    });
  }
};