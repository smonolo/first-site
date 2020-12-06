import React, { createRef, Component } from 'react';
import axios, { AxiosResponse } from 'axios';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import validator from 'validator';

import { allowedEmailChars, allowedPasswordChars, allowedUsernameChars, titles } from '../constants';

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

class Register extends Component<Props, State> {
  private title: string = titles.register;

  private username: any = createRef();
  private email: any = createRef();
  private password: any = createRef();
  private repeatPassword: any = createRef();

  constructor(props: Props) {
    super(props);

    this.state = {
      error: '',
      button: {
        text: 'register',
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
        text: 'register',
        disabled: false
      }
    });
  };

  async register(event: any) {
    event.preventDefault();

    this.setState({
      error: '',
      button: {
        text: 'loading',
        disabled: true
      }
    });

    const usernameValue: string = validator.unescape(validator.trim(this.username.value));
    const emailValue: string = validator.unescape(validator.trim(this.email.value));
    const passwordValue: string = validator.unescape(validator.trim(this.password.value));
    const repeatPasswordValue: string = validator.unescape(validator.trim(this.repeatPassword.value));

    if (!usernameValue) {
      return this.setFormData('username is missing');
    }

    if (usernameValue.length < 3) {
      return this.setFormData('username is too short');
    }

    if (usernameValue.length > 15) {
      return this.setFormData('username is too long');
    }

    if (!usernameValue.match(allowedUsernameChars)) {
      return this.setFormData('username contains invalid characters');
    }

    if (!emailValue) {
      return this.setFormData('email is missing');
    }

    if (emailValue.length < 5) {
      return this.setFormData('email is too short');
    }

    if (emailValue.length > 320) {
      return this.setFormData('email is too long');
    }

    if (!validator.isEmail(emailValue)) {
      return this.setFormData('email is invalid');
    }

    if (!emailValue.match(allowedEmailChars)) {
      return this.setFormData('username contains invalid characters');
    }

    if (!passwordValue || !repeatPasswordValue) {
      return this.setFormData('password is missing');
    }

    if (passwordValue.length < 8 || repeatPasswordValue.length < 8) {
      return this.setFormData('password is too short');
    }

    if (passwordValue.length > 1024 || repeatPasswordValue.length > 1024) {
      return this.setFormData('password is too long');
    }

    if (
      !passwordValue.match(allowedPasswordChars) ||
      !repeatPasswordValue.match(allowedPasswordChars)
    ) {
      return this.setFormData('password contains invalid characters');
    }

    if (passwordValue !== repeatPasswordValue) {
      return this.setFormData('passwords do not match');
    }

    this.username.value = '';
    this.email.value = '';
    this.password.value = '';
    this.repeatPassword.value = '';

    const request: AxiosResponse = await axios.post('http://localhost:57484/api/auth/register', {
      auth: 'authRegister',
      type: 'register',
      payload: {
        username: usernameValue,
        email: emailValue,
        password: passwordValue,
        repeatPassword: repeatPasswordValue
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
      this.setFormData(data.error || 'could not register');
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
          username
          <br />
          <Input
            type='text'
            name='username'
            minLength={3}
            maxLength={15}
            ref={(input: HTMLInputElement) => this.username = input}
            required
          />
          <br /><br />
          email
          <br />
          <Input
            type='email'
            name='email'
            minLength={5}
            maxLength={320}
            ref={(input: HTMLInputElement) => this.email = input}
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
          repeat password
          <br />
          <Input
            type='password'
            name='repeatPassword'
            minLength={8}
            maxLength={1024}
            ref={(input: HTMLInputElement) => this.repeatPassword = input}
            required
          />
          <br /><br />
          <Button
            type='submit'
            disabled={this.state.button.disabled}
            onClick={event => this.register(event)}
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

export default connect(mapStateToProps, mapDispatchToProps)(Register);