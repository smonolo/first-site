import React, { Fragment, FunctionComponent, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import { connect } from 'react-redux';

import { navigation, NavigationItem } from '../constants';
import { store, getAuth, Dispatch, State } from '../store';
import { RequestData } from '../pages/Login';

import { NavigationLink } from '../styles';

const mapStateToProps = (state: State) => {
  return { ...state };
};

const Navigation: FunctionComponent<{ dispatch: Dispatch }> = ({ dispatch }) => {
  const { logged } = getAuth(store.getState());

  const logout: Function = () => {
    if (logged) {
      localStorage.removeItem('jwt');

      dispatch({ type: 'LOGOUT' });
    }
  };

  useEffect(() => {
    const verifyJwt: Function = async () => {
      const request: AxiosResponse = await axios.post('/verify', {
        jwt: localStorage.getItem('jwt')
      });

      const data: RequestData = request.data;

      if (data.success && data.payload) {
        dispatch({
          type: 'LOGIN',
          payload: {
            logged: true,
            ...data.payload
          }
        });
      } else {
        localStorage.removeItem('jwt');

        dispatch({ type: 'LOGOUT' });
      }
    };

    if (localStorage.getItem('jwt')) {
      verifyJwt();
    } else if (logged) {
      localStorage.removeItem('jwt');

      dispatch({ type: 'LOGOUT' });
    }
  });

  return (
    <Fragment>
      {navigation.map((item: NavigationItem, index: number) => (
        <NavigationLink
          key={`navigation-links-${index}`}
          to={item.path}
        >
          {item.text}
        </NavigationLink>
      ))}
      {logged && (
        <NavigationLink
          to=''
          onClick={event => {
            event.preventDefault();

            logout();
          }}
        >
          logout
        </NavigationLink>
      )}
      {!logged && (
        <NavigationLink to='/login'>
          login
        </NavigationLink>
      )}
    </Fragment>
  );
};

export default connect(mapStateToProps)(Navigation);