import React, { Fragment, Component, createRef } from 'react';
import axios, { AxiosResponse } from 'axios';
import validator from 'validator';

import { allowedEmailChars } from '../../constants';

import { LoginResponse, AuthState } from '../../redux/auth';
import { AdminUser } from '../../redux/admin';

import { Paragraph, Input, Error, Info, ButtonRed, Button, AdminBadge } from '../../styles';

interface Props {
  readonly loading: boolean;
  readonly users: Array<AdminUser>;
  readonly login: (payload: AuthState) => void;
  readonly logout: Function;
  readonly fetchUsers: Function;
  readonly banned: boolean;
}

type State = {
  loginError: string,
  loginInfo: string,
  loginButton: {
    text: string,
    disabled: boolean
  },
  banError: string,
  banInfo: string,
  banButton: {
    text: string,
    disabled: boolean
  },
  unbanError: string,
  unbanInfo: string,
  unbanButton: {
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
  private loginUsername: any = createRef();
  private banUsername: any = createRef();
  private unbanUsername: any = createRef();
  private deleteUsername: any = createRef();

  constructor(props: Props) {
    super(props);

    this.state = {
      loginError: '',
      loginInfo: '',
      loginButton: {
        text: 'login',
        disabled: false
      },
      banError: '',
      banInfo: '',
      banButton: {
        text: 'ban',
        disabled: false
      },
      unbanError: '',
      unbanInfo: '',
      unbanButton: {
        text: 'unban',
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

  setBanFormData(banError: string = '', banInfo: string = '') {
    this.setState({
      banError,
      banInfo,
      banButton: {
        text: 'ban',
        disabled: false
      }
    });
  };

  setUnbanFormData(unbanError: string = '', unbanInfo: string = '') {
    this.setState({
      unbanError,
      unbanInfo,
      unbanButton: {
        text: 'unban',
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

    if (this.props.banned) {
      return this.setLoginFormData('you are currently banned');
    }

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

  async banUser(event: any) {
    event.preventDefault();

    this.setState({
      banError: '',
      banInfo: '',
      banButton: {
        text: 'loading',
        disabled: true
      }
    });

    const banUsernameValue: string = validator.unescape(validator.trim(this.banUsername.value));

    if (this.props.banned) {
      return this.setBanFormData('you are currently banned');
    }

    if (!banUsernameValue) {
      return this.setBanFormData('username is missing');
    }

    if (banUsernameValue.length < 3) {
      return this.setBanFormData('username is too short');
    }

    if (banUsernameValue.length > 320) {
      return this.setBanFormData('username is too long');
    }

    if (!banUsernameValue.match(allowedEmailChars)) {
      return this.setBanFormData('username contains invalid characters');
    }

    this.banUsername.value = '';

    const request: AxiosResponse = await axios.post('/api/admin/users', {
      auth: 'adminUsers',
      type: 'banUser',
      payload: {
        jwt: localStorage.getItem('jwt'),
        username: banUsernameValue
      }
    });

    const data: DeleteUserResponse = request.data;

    if (data.success && !data.error) {
      this.setBanFormData('', 'user banned');

      setTimeout(() => {
        this.setState({ banInfo: '' });
      }, 5000);
    } else {
      this.setBanFormData(data.error);
    }
  };

  async unbanUser(event: any) {
    event.preventDefault();

    this.setState({
      unbanError: '',
      unbanInfo: '',
      unbanButton: {
        text: 'loading',
        disabled: true
      }
    });

    const unbanUsernameValue: string = validator.unescape(validator.trim(this.unbanUsername.value));

    if (this.props.banned) {
      return this.setUnbanFormData('you are currently banned');
    }

    if (!unbanUsernameValue) {
      return this.setUnbanFormData('username is missing');
    }

    if (unbanUsernameValue.length < 3) {
      return this.setUnbanFormData('username is too short');
    }

    if (unbanUsernameValue.length > 320) {
      return this.setUnbanFormData('username is too long');
    }

    if (!unbanUsernameValue.match(allowedEmailChars)) {
      return this.setUnbanFormData('username contains invalid characters');
    }

    this.unbanUsername.value = '';

    const request: AxiosResponse = await axios.post('/api/admin/users', {
      auth: 'adminUsers',
      type: 'unbanUser',
      payload: {
        jwt: localStorage.getItem('jwt'),
        username: unbanUsernameValue
      }
    });

    const data: DeleteUserResponse = request.data;

    if (data.success && !data.error) {
      this.setUnbanFormData('', 'user unbanned');

      setTimeout(() => {
        this.setState({ unbanInfo: '' });
      }, 5000);
    } else {
      this.setUnbanFormData(data.error);
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

    if (this.props.banned) {
      return this.setDeleteFormData('you are currently banned');
    }

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
              count: {this.props.banned ? 0 : this.props.users.length}
              <br />
              {
                this.props.banned ? (
                  <Fragment>
                    access denied. you are banned
                  </Fragment>
                ) : (
                  <Fragment>
                    list:
                    <ul>
                      {this.props.users.map(user => (
                        <li>
                          {user.username} {user.email && `(${user.email})`}
                          {user.siteAdmin && (
                            <AdminBadge>admin</AdminBadge>
                          )}
                          {user.banned && (
                            <AdminBadge>banned</AdminBadge>
                          )}
                        </li>
                      ))}
                    </ul>
                    <Button onClick={() => this.props.fetchUsers()}>
                      refresh
                    </Button>
                  </Fragment>
                )
              }
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
          ban user
          <br /><br />
          {this.state.banError && <Error>{this.state.banError}</Error>}
          {this.state.banInfo && <Info>{this.state.banInfo}</Info>}
          username or email
          <br />
          <Input
            type='text'
            name='banUsername'
            minLength={3}
            maxLength={320}
            ref={(input: HTMLInputElement) => this.banUsername = input}
            required
          />
          <br /><br />
          <ButtonRed
            type='submit'
            disabled={this.state.banButton.disabled}
            onClick={event => this.banUser(event)}
          >
            {this.state.banButton.text}
          </ButtonRed>
        </Paragraph>
        <br />
        <Paragraph>
          unban user
          <br /><br />
          {this.state.unbanError && <Error>{this.state.unbanError}</Error>}
          {this.state.unbanInfo && <Info>{this.state.unbanInfo}</Info>}
          username or email
          <br />
          <Input
            type='text'
            name='unbanUsername'
            minLength={3}
            maxLength={320}
            ref={(input: HTMLInputElement) => this.unbanUsername = input}
            required
          />
          <br /><br />
          <Button
            type='submit'
            disabled={this.state.unbanButton.disabled}
            onClick={event => this.unbanUser(event)}
          >
            {this.state.unbanButton.text}
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