import React, { Fragment, Component, createRef } from 'react';
import axios, { AxiosResponse } from 'axios';
import validator from 'validator';

import { allowedEmailChars } from '../../constants';

import { LoginResponse, AuthState } from '../../redux/auth';

import { Paragraph, Input, Error, Info, ButtonRed, Button } from '../../styles';

interface Props {
  readonly loading: boolean;
  readonly users: Array<string>;
  readonly login: (payload: AuthState) => void;
  readonly logout: Function;
}

type State = {
  loginError: string,
  loginInfo: string,
  loginButton: {
    text: string,
    disabled: boolean
  },
  deleteError: string,
  deleteInfo: string,
  deleteButton: {
    text: string,
    disabled: boolean
  }
};

interface DeleteUserResponse {
  readonly success: boolean;
  readonly error?: string;
}

class Users extends Component<Props, State> {
  private deleteUsername: any = createRef();
  private loginUsername: any = createRef();

  constructor(props: Props) {
    super(props);

    this.state = {
      loginError: '',
      loginInfo: '',
      loginButton: {
        text: 'login',
        disabled: false
      },
      deleteError: '',
      deleteInfo: '',
      deleteButton: {
        text: 'delete',
        disabled: false
      }
    };
  };

  setLoginFormData(loginError: string = '', loginInfo: string = '') {
    this.setState({
      loginError,
      loginInfo,
      loginButton: {
        text: 'login',
        disabled: false
      }
    });
  };

  setDeleteFormData(deleteError: string = '', deleteInfo: string = '') {
    this.setState({
      deleteError,
      deleteInfo,
      deleteButton: {
        text: 'delete',
        disabled: false
      }
    });
  };

  async loginAsUser(event: any) {
    event.preventDefault();

    this.setState({
      loginError: '',
      loginInfo: '',
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

    if (data.success && data.payload && !data.error) {
      this.setLoginFormData('', 'logging in as user');

      setTimeout(() => {
        this.setState({ loginInfo: '' });

        this.props.logout();

        // for some reason, this doesn't work with typescript
        // @ts-ignore
        this.props.login({
          logged: true,
          ...data.payload
        });
      }, 5000);
    } else {
      this.setLoginFormData(data.error);
    }
  };

  async deleteUser(event: any) {
    event.preventDefault();

    this.setState({
      deleteError: '',
      deleteInfo: '',
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

    if (data.success && !data.error) {
      this.setDeleteFormData('', 'user deleted');

      setTimeout(() => {
        this.setState({ deleteInfo: '' });
      }, 5000);
    } else {
      this.setDeleteFormData(data.error);
    }
  };

  render() {
    return (
      <Fragment>
        <Paragraph>
          {this.props.loading && 'loading users...'}
          {!this.props.loading && (
            <Fragment>
              users
              <br /><br />
              count: {this.props.users.length}
              <br />
              list: {this.props.users.join(', ')}
            </Fragment>
          )}
        </Paragraph>
        <br />
        <Paragraph>
          login as user
          <br /><br />
          {this.state.loginError && <Error>{this.state.loginError}</Error>}
          {this.state.loginInfo && <Info>{this.state.loginInfo}</Info>}
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
        </Paragraph>
        <br />
        <Paragraph>
          delete user
          <br /><br />
          {this.state.deleteError && <Error>{this.state.deleteError}</Error>}
          {this.state.deleteInfo && <Info>{this.state.deleteInfo}</Info>}
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
      </Fragment>
    );
  };
}

export default Users;