import React, { Fragment, Component, createRef } from 'react';
import axios, { AxiosResponse } from 'axios';
import validator from 'validator';

import { allowedEmailChars } from '../../constants';

import { LoginResponse, AuthState } from '../../redux/auth';

import { Paragraph, Input, Error, ButtonRed, Button } from '../../styles';

interface Props {
  readonly loading: boolean;
  readonly users: Array<string>;
  readonly login: (payload: AuthState) => void;
  readonly logout: Function;
}

type State = {
  deleteError: string,
  deleteButton: {
    text: string,
    disabled: boolean
  },
  loginError: string,
  loginButton: {
    text: string,
    disabled: boolean
  }
};

interface DeleteUserResponse {
  readonly success: boolean;
}

class Users extends Component<Props, State> {
  private deleteUsername: any = createRef();
  private loginUsername: any = createRef();

  constructor(props: Props) {
    super(props);

    this.state = {
      deleteError: '',
      deleteButton: {
        text: 'delete',
        disabled: false
      },
      loginError: '',
      loginButton: {
        text: 'login',
        disabled: false
      }
    };
  };

  setDeleteFormData(deleteError: string) {
    this.setState({
      deleteError,
      deleteButton: {
        text: 'delete',
        disabled: false
      }
    });
  };

  setLoginFormData(loginError: string) {
    this.setState({
      loginError,
      loginButton: {
        text: 'login',
        disabled: false
      }
    });
  };

  async deleteUser(event: any) {
    event.preventDefault();

    this.setState({
      deleteError: '',
      deleteButton: {
        text: 'loading',
        disabled: true
      }
    });

    const deleteUsernameValue: string = validator.unescape(validator.trim(this.deleteUsername.value));

    if (!deleteUsernameValue) {
      return this.setDeleteFormData('username is missing');
    }

    if (deleteUsernameValue.length < 3) {
      return this.setDeleteFormData('username is too short');
    }

    if (deleteUsernameValue.length > 320) {
      return this.setDeleteFormData('username is too long');
    }

    if (!deleteUsernameValue.match(allowedEmailChars)) {
      return this.setDeleteFormData('username contains invalid characters');
    }

    this.deleteUsername.value = '';

    const request: AxiosResponse = await axios.post('/api/admin/users', {
      auth: 'adminUsers',
      type: 'deleteUser',
      payload: {
        jwt: localStorage.getItem('jwt'),
        username: deleteUsernameValue
      }
    });

    const data: DeleteUserResponse = request.data;

    if (data.success) {
      this.setDeleteFormData('');
    } else {
      this.setDeleteFormData('could not delete user');
    }
  };

  async loginAsUser(event: any) {
    event.preventDefault();

    this.setState({
      loginError: '',
      loginButton: {
        text: 'loading',
        disabled: true
      }
    });

    const loginUsernameValue: string = validator.unescape(validator.trim(this.loginUsername.value));

    if (!loginUsernameValue) {
      return this.setLoginFormData('username is missing');
    }

    if (loginUsernameValue.length < 3) {
      return this.setLoginFormData('username is too short');
    }

    if (loginUsernameValue.length > 320) {
      return this.setLoginFormData('username is too long');
    }

    if (!loginUsernameValue.match(allowedEmailChars)) {
      return this.setLoginFormData('username contains invalid characters');
    }

    this.loginUsername.value = '';

    const request: AxiosResponse = await axios.post('/api/admin/users', {
      auth: 'adminUsers',
      type: 'loginAsUser',
      payload: {
        jwt: localStorage.getItem('jwt'),
        username: loginUsernameValue
      }
    });

    const data: LoginResponse = request.data;

    if (data.success && data.payload) {
      this.setLoginFormData('');

      this.props.logout();

      this.props.login({
        logged: true,
        ...data.payload
      });
    } else {
      this.setLoginFormData('could not login as user');
    }
  };

  render() {
    return (
      <Paragraph>
        users
        <br /><br />
        {this.props.loading && 'loading users...'}
        {!this.props.loading && (
          <Fragment>
            count: {this.props.users.length}
            <br />
            list: {this.props.users.join(', ')}
          </Fragment>
        )}
        <br /><br />
        login as user
        <br /><br />
        {this.state.loginError && <Error>{this.state.loginError}</Error>}
        username or email
        <br />
        <Input
          type='text'
          name='loginUsername'
          minLength={3}
          maxLength={320}
          ref={(input: HTMLInputElement) => this.loginUsername = input}
          required
        />
        <br /><br />
        <Button
          type='submit'
          disabled={this.state.loginButton.disabled}
          onClick={event => this.loginAsUser(event)}
        >
          {this.state.loginButton.text}
        </Button>
        <br /><br />
        delete user
        <br /><br />
        {this.state.deleteError && <Error>{this.state.deleteError}</Error>}
        username or email
        <br />
        <Input
          type='text'
          name='deleteUsername'
          minLength={3}
          maxLength={320}
          ref={(input: HTMLInputElement) => this.deleteUsername = input}
          required
        />
        <br /><br />
        <ButtonRed
          type='submit'
          disabled={this.state.deleteButton.disabled}
          onClick={event => this.deleteUser(event)}
        >
          {this.state.deleteButton.text}
        </ButtonRed>
      </Paragraph>
    );
  };
}

export default Users;