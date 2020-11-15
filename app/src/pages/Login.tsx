import React, { createRef, Component } from 'react';
import axios, { AxiosResponse } from 'axios';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { Redirect } from 'react-router';

import { titles } from '../constants';

import { AuthState, isLogged, login } from '../redux/auth';

import Base from '../components/Base';

import { Button, Error, Input, Paragraph } from '../styles';

// interface is readonly
export interface RequestData {
  readonly success: boolean;
  readonly payload?: {
    readonly jwt: string;
    readonly id: string;
    readonly username: string;
    readonly email: string;
    readonly siteAdmin: boolean;
  };
}

type Props = {
  logged: boolean,
  login: (payload: AuthState) => void
};

type State = {
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

    if (usernameValue.length < 3) {
      return this.setFormData('username is too short');
    }

    if (!passwordValue) {
      return this.setFormData('password is missing');
    }

    if (passwordValue.length < 8) {
      return this.setFormData('password is too short');
    }

    if (passwordValue.length > 1024) {
      return this.setFormData('password is too long');
    }

    this.username.value = '';
    this.password.value = '';

    const request: AxiosResponse = await axios.post('/auth/login', {
      auth: 'authLogin',
      username: usernameValue,
      password: passwordValue
    });

    const data: RequestData = request.data;

    if (data.success && data.payload) {
      localStorage.setItem('jwt', data.payload.jwt);

      this.setFormData('');

      this.props.login({
        logged: true,
        ...data.payload
      });
    } else {
      this.setFormData('invalid username or password');
    }
  };

  render() {
    if (this.props.logged) {
      return <Redirect to='/' />;
    }

    return (
      <Base title={this.title}>
        <Paragraph>
          {this.state.error && <Error>{this.state.error}</Error>}
          username or email
          <br />
          <Input
            type='text'
            name='username'
            minLength={3}
            ref={(input: HTMLInputElement) => this.username = input}
            required
          />
          <br /><br />
          password
          <br />
          <Input
            type='password'
            name='password'
            minLength={8}
            maxLength={1024}
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
        </Paragraph>
      </Base>
    );
  };
}

const mapStateToProps = createSelector(
  isLogged,
  logged => ({ logged })
);

const mapDispatchToProps = {
  login
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);