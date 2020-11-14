import React, { FunctionComponent, Fragment, Ref, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import axios, { AxiosResponse } from 'axios';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import { titles } from '../constants';
import { store, getAuth, Dispatch, State } from '../store';

import Navigation from '../components/Navigation';

import { Box, Button, Error, Input, Paragraph, Text, Title } from '../styles';

export interface RequestData {
  readonly success: boolean;
  readonly payload?: {
    readonly jwt: string;
    readonly username: string;
  };
}

const mapStateToProps = (state: State) => {
  return { ...state };
};

const Login: FunctionComponent<{ dispatch: Dispatch }> = ({ dispatch }) => {
  const title: string = titles.login;

  const [error, setError] = useState('');
  const [button, setButton] = useState({ text: 'login', disabled: false });

  const username: Ref<any> = useRef(null);
  const password: Ref<any> = useRef(null);

  const { logged } = getAuth(store.getState());

  const setFormData: Function = (error: string) => {
    setError(error);
    setButton({ text: 'login', disabled: false });
  };

  const login: Function = async (event: MouseEvent) => {
    event.preventDefault();

    setError('');
    setButton({ text: 'loading', disabled: true });

    const usernameValue: string = username.current.value;
    const passwordValue: string = password.current.value;

    if (!usernameValue) {
      return setFormData('username is missing');
    }

    if (!passwordValue) {
      return setFormData('password is missing');
    }

    username.current.value = '';
    password.current.value = '';

    const request: AxiosResponse = await axios.post('/login', {
      username: usernameValue,
      password: passwordValue
    });

    const data: RequestData = request.data;

    if (data.success && data.payload) {
      localStorage.setItem('jwt', data.payload.jwt);

      setFormData('');

      dispatch({
        type: 'LOGIN',
        payload: {
          logged: true,
          ...data.payload
        }
      });
    } else {
      setFormData('invalid username or password');
    }
  };

  if (logged) {
    return <Redirect to='/' />;
  }

  return (
    <Fragment>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Box>
        <Text>
          <Title>{title}</Title>
          <br />
          <Paragraph>
            {error && <Error>{error}</Error>}
            <form>
              username
              <br />
              <Input
                type='text'
                name='username'
                ref={username}
                required
              />
              <br /><br />
              password
              <br />
              <Input
                type='password'
                name='password'
                ref={password}
                required
              />
              <br /><br />
              <Button
                type='submit'
                disabled={button.disabled}
                onClick={event => login(event)}
              >
                {button.text}
              </Button>
            </form>
          </Paragraph>
          <br />
          <Navigation />
        </Text>
      </Box>
    </Fragment>
  )
};

export default connect(mapStateToProps)(Login);