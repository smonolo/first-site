import React, { createRef, Component } from 'react';
import axios, { AxiosResponse } from 'axios';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import validator from 'validator';

import { allowedEmailChars, allowedPasswordChars, titles } from '../constants';

import { AuthState, isLogged, login, LoginResponse } from '../redux/auth';

import Base from '../components/Base';
import Loading from '../components/Loading';

import { Button, Error, Input, Paragraph } from '../styles';

interface Props {
  readonly logged: boolean;
  readonly login: (payload: AuthState) => void;
}

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

  componentDidMount() {
    if (this.props.logged) {
      window.location.assign('/');
    }
  };

  componentDidUpdate() {
    if (this.props.logged) {
      window.location.assign('/');
    }
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

    const usernameValue: string = validator.unescape(validator.trim(this.username.value));
    const passwordValue: string = validator.unescape(validator.trim(this.password.value));

    if (!usernameValue) {
      return this.setFormData('username is missing');
    }

    if (usernameValue.length < 3) {
      return this.setFormData('username is too short');
    }

    if (usernameValue.length > 320) {
      return this.setFormData('username is too long');
    }

    if (!usernameValue.match(allowedEmailChars)) {
      return this.setFormData('username contains invalid characters');
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

    if (!passwordValue.match(allowedPasswordChars)) {
      return this.setFormData('password contains invalid characters');
    }

    this.username.value = '';
    this.password.value = '';

    const request: AxiosResponse = await axios.post('/api/auth/login', {
      auth: 'authLogin',
      type: 'login',
      payload: {
        username: usernameValue,
        password: passwordValue
      }
    });

    const data: LoginResponse = request.data;

    if (data.success && data.payload && !data.error) {
      this.setFormData('');

      this.props.login({
        logged: true,
        ...data.payload
      });
    } else {
      this.setFormData(data.error || 'could not login');
    }
  };

  render() {
    if (this.props.logged) {
      return <Loading />;
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
            maxLength={320}
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