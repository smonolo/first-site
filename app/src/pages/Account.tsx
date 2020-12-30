import React, { Component, Fragment, createRef } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import axios, { AxiosResponse } from 'axios';
import validator from 'validator';

import {
  allowedEmailChars,
  allowedUsernameChars,
  titles,
  disallowedUsernames
} from '../constants';

import { isLogged, logout, getAuth, AuthState } from '../redux/auth';

import Base from '../components/Base';
import Loading from '../components/Loading';

import { AdminBadge, Error, Info, Input, Paragraph, ButtonRed, Button } from '../styles';

interface Props {
  readonly logged: boolean;
  readonly logout: Function;
  readonly auth: AuthState;
}

type State = {
  updateError: string,
  updateInfo: string,
  updateButton: {
    text: string,
    disabled: boolean
  },
  updateEmailError: string,
  updateEmailInfo: string,
  updateEmailButton: {
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

interface RequestData {
  readonly success: boolean;
  readonly error?: string;
}

class Account extends Component<Props, State> {
  private title: string = titles.account;

  private updateUsername: any = createRef();
  private updateEmail: any = createRef();
  private deleteUsername: any = createRef();

  constructor(props: Props) {
    super(props);

    this.state = {
      updateError: '',
      updateInfo: '',
      updateButton: {
        text: 'update',
        disabled: false
      },
      updateEmailError: '',
      updateEmailInfo: '',
      updateEmailButton: {
        text: 'update',
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

  componentDidMount() {
    if (!this.props.logged) {
      window.location.assign('/');
    }
  };

  componentDidUpdate() {
    if (!this.props.logged) {
      window.location.assign('/');
    }
  };

  setUpdateFormData(updateError: string = '', updateInfo: string = '') {
    this.setState({
      updateError,
      updateInfo,
      updateButton: {
        text: 'update',
        disabled: false
      }
    });
  };

  setUpdateEmailFormData(updateEmailError: string = '', updateEmailInfo: string = '') {
    this.setState({
      updateEmailError,
      updateEmailInfo,
      updateEmailButton: {
        text: 'update',
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

  async changeUsername(event: any) {
    event.preventDefault();

    this.setState({
      updateError: '',
      updateInfo: '',
      updateButton: {
        text: 'update',
        disabled: true
      }
    });

    const updateUsernameValue: string = validator.unescape(validator.trim(this.updateUsername.value));

    if (!updateUsernameValue) {
      return this.setUpdateFormData('username is missing');
    }

    if (updateUsernameValue.length < 3) {
      return this.setUpdateFormData('username is too short');
    }

    if (updateUsernameValue.length > 15) {
      return this.setUpdateFormData('username is too long');
    }

    if (!updateUsernameValue.match(allowedUsernameChars)) {
      return this.setUpdateFormData('username contains invalid characters');
    }

    if (disallowedUsernames.includes(updateUsernameValue)) {
      return this.setUpdateFormData('username is not allowed');
    }

    if (updateUsernameValue === this.props.auth.username) {
      return this.setUpdateFormData('username is already in use');
    }

    this.updateUsername.value = '';

    const request: AxiosResponse = await axios.post('/api/auth/account', {
      auth: 'authAccount',
      type: 'updateUsername',
      payload: {
        jwt: this.props.auth.jwt,
        username: updateUsernameValue,
      }
    });

    const data: RequestData = request.data;

    if (data.success && !data.error) {
      this.setUpdateFormData('', 'username updated');

      setTimeout(() => {
        this.setState({ updateInfo: '' });
      }, 5000);
    } else {
      this.setUpdateFormData(data.error);
    }
  };

  async changeEmail(event: any) {
    event.preventDefault();

    this.setState({
      updateEmailError: '',
      updateEmailInfo: '',
      updateEmailButton: {
        text: 'update',
        disabled: true
      }
    });

    const updateEmailValue: string = validator.unescape(validator.trim(this.updateEmail.value));

    if (!updateEmailValue) {
      return this.setUpdateEmailFormData('email is missing');
    }

    if (updateEmailValue.length < 5) {
      return this.setUpdateEmailFormData('email is too short');
    }

    if (updateEmailValue.length > 320) {
      return this.setUpdateEmailFormData('email is too long');
    }

    if (!updateEmailValue.match(allowedEmailChars)) {
      return this.setUpdateEmailFormData('email contains invalid characters');
    }

    if (!validator.isEmail(updateEmailValue)) {
      return this.setUpdateEmailFormData('email is invalid');
    }

    if (updateEmailValue === this.props.auth.email) {
      return this.setUpdateEmailFormData('email is already in use');
    }

    this.updateEmail.value = '';

    const request: AxiosResponse = await axios.post('/api/auth/account', {
      auth: 'authAccount',
      type: 'updateEmail',
      payload: {
        jwt: this.props.auth.jwt,
        email: updateEmailValue,
      }
    });

    const data: RequestData = request.data;

    if (data.success && !data.error) {
      this.setUpdateEmailFormData('', 'email updated');

      setTimeout(() => {
        this.setState({ updateEmailInfo: '' });
      }, 5000);
    } else {
      this.setUpdateEmailFormData(data.error);
    }
  };

  async deleteAccount(event: any) {
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

    if (deleteUsernameValue.length > 15) {
      return this.setDeleteFormData('username is too long');
    }

    if (!deleteUsernameValue.match(allowedUsernameChars)) {
      return this.setDeleteFormData('username contains invalid characters');
    }

    if (deleteUsernameValue !== this.props.auth.username) {
      return this.setDeleteFormData('username is incorrect');
    }

    if (this.props.auth.siteAdmin) {
      return this.setDeleteFormData('cannot delete account as site admin');
    }

    this.deleteUsername.value = '';

    const request: AxiosResponse = await axios.post('/api/auth/account', {
      auth: 'authAccount',
      type: 'deleteAccount',
      payload: {
        jwt: this.props.auth.jwt,
        username: deleteUsernameValue,
      }
    });

    const data: RequestData = request.data;

    if (data.success && !data.error) {
      this.setDeleteFormData('', 'account deleted, logging you out');

      setTimeout(() => {
        this.setState({ deleteInfo: '' });

        this.props.logout();
      }, 5000);
    } else {
      this.setDeleteFormData(data.error);
    }
  };

  render() {
    if (!this.props.logged) {
      return <Loading />;
    }

    return (
      <Base title={this.title}>
        {this.props.auth.banned && (
          <Fragment>
            <Paragraph>
              your account is currently
              <AdminBadge>
                banned
              </AdminBadge>
            </Paragraph>
            <br />
          </Fragment>
        )}
        <Paragraph>
          hi {this.props.auth.username}
          {this.props.auth.siteAdmin && (
            <AdminBadge>
              admin
            </AdminBadge>
          )}
          <br /><br />
          id: {this.props.auth.id}
          <br />
          email: {this.props.auth.email}
        </Paragraph>
        <br />
        <Paragraph>
          update username
          <br /><br />
          {this.state.updateError && <Error>{this.state.updateError}</Error>}
          {this.state.updateInfo && <Info>{this.state.updateInfo}</Info>}
          new username
          <br />
          <Input
            type='text'
            name='updateUsername'
            minLength={3}
            maxLength={15}
            ref={(input: HTMLInputElement) => this.updateUsername = input}
            required
          />
          <br /><br />
          <Button
            type='submit'
            disabled={this.state.updateButton.disabled}
            onClick={event => this.changeUsername(event)}
          >
            {this.state.updateButton.text}
          </Button>
        </Paragraph>
        <br />
        <Paragraph>
          update email
          <br /><br />
          {this.state.updateEmailError && <Error>{this.state.updateEmailError}</Error>}
          {this.state.updateEmailInfo && <Info>{this.state.updateEmailInfo}</Info>}
          new email
          <br />
          <Input
            type='email'
            name='updateEmail'
            minLength={5}
            maxLength={320}
            ref={(input: HTMLInputElement) => this.updateEmail = input}
            required
          />
          <br /><br />
          <Button
            type='submit'
            disabled={this.state.updateEmailButton.disabled}
            onClick={event => this.changeEmail(event)}
          >
            {this.state.updateEmailButton.text}
          </Button>
        </Paragraph>
        <br />
        <Paragraph>
          delete account
          <br /><br />
          {this.state.deleteError && <Error>{this.state.deleteError}</Error>}
          {this.state.deleteInfo && <Info>{this.state.deleteInfo}</Info>}
          username
          <br />
          <Input
            type='text'
            name='deleteUsername'
            minLength={3}
            maxLength={15}
            ref={(input: HTMLInputElement) => this.deleteUsername = input}
            required
          />
          <br /><br />
          <ButtonRed
            type='submit'
            disabled={this.state.deleteButton.disabled}
            onClick={event => this.deleteAccount(event)}
          >
            {this.state.deleteButton.text}
          </ButtonRed>
        </Paragraph>
      </Base>
    );
  };
}

const mapStateToProps = createSelector(
  isLogged,
  getAuth,
  (logged, auth) => ({ logged, auth })
);

const mapDispatchToProps = {
  logout
};

export default connect(mapStateToProps, mapDispatchToProps)(Account);