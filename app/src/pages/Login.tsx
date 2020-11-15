import React, { Fragment, createRef, Component } from 'react';
import { Helmet } from 'react-helmet';
import axios, { AxiosResponse } from 'axios';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import { titles } from '../constants';

import { store, StoreState } from '../redux/store';
import { getAuth, AuthDispatch } from '../redux/auth';

import Navigation from '../components/Navigation';

import { Box, Button, Error, Input, Paragraph, Text, Title } from '../styles';

// interface is readonly
export interface RequestData {
  readonly success: boolean;
  readonly payload?: {
    readonly jwt: string;
    readonly username: string;
  };
}

type Props = {
  dispatch: AuthDispatch
};

type State = {
  logged: boolean,
  error: string,
  button: {
    text: string,
    disabled: boolean
  }
};

class Login extends Component<Props, State> {
  private title: string = titles.login;

  private username: any = createRef();
  private password: any = createRef();

  constructor(props: Props) {
    super(props);

    this.state = {
      logged: getAuth(store.getState()).logged,
      error: '',
      button: {
        text: 'login',
        disabled: false
      }
    };
  };

  setFormData(error: string) {
    this.setState({
      error,
      button: {
        text: 'login',
        disabled: false
      }
    });
  };

  async login(event: any) {
    event.preventDefault();

    this.setState({
      error: '',
      button: {
        text: 'loading',
        disabled: true
      }
    });

    const usernameValue: string = this.username.value;
    const passwordValue: string = this.password.value;

    if (!usernameValue) {
      return this.setFormData('username is missing');
    }

    if (!passwordValue) {
      return this.setFormData('password is missing');
    }

    this.username.value = '';
    this.password.value = '';

    const request: AxiosResponse = await axios.post('/login', {
      username: usernameValue,
      password: passwordValue
    });

    const data: RequestData = request.data;

    if (data.success && data.payload) {
      localStorage.setItem('jwt', data.payload.jwt);

      this.setFormData('');

      this.props.dispatch({
        type: 'LOGIN',
        payload: {
          logged: true,
          ...data.payload
        }
      });

      this.setState({ logged: true });
    } else {
      this.setFormData('invalid username or password');
    }
  };

  render() {
    if (this.state.logged) {
      return <Redirect to='/' />;
    }

    return (
      <Fragment>
        <Helmet>
          <title>{this.title}</title>
        </Helmet>
        <Box>
          <Text>
            <Title>{this.title}</Title>
            <br />
            <Paragraph>
              {this.state.error && <Error>{this.state.error}</Error>}
              <form>
                username
                <br />
                <Input
                  type='text'
                  name='username'
                  ref={(input: HTMLInputElement) => this.username = input}
                  required
                />
                <br /><br />
                password
                <br />
                <Input
                  type='password'
                  name='password'
                  ref={(input: HTMLInputElement) => this.password = input}
                  required
                />
                <br /><br />
                <Button
                  type='submit'
                  disabled={this.state.button.disabled}
                  onClick={event => this.login(event)}
                >
                  {this.state.button.text}
                </Button>
              </form>
            </Paragraph>
            <br />
            <Navigation />
          </Text>
        </Box>
      </Fragment>
    );
  };
}

const mapStateToProps = (state: StoreState) => ({ ...state });

export default connect(mapStateToProps)(Login);