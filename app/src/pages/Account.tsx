import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import axios, { AxiosResponse } from 'axios';
import validator from 'validator';

import { allowedUsernameChars, titles } from '../constants';

import { isLogged, logout, getAuth, AuthState } from '../redux/auth';

import Base from '../components/Base';
import Loading from '../components/Loading';

import { AdminBadge, Error, Input, Paragraph, ButtonRed, Button } from '../styles';

interface Props {
  readonly logged: boolean;
  readonly logout: Function;
  readonly auth: AuthState;
}

type State = {
  updateError: string,
  updateButton: {
    text: string,
    disabled: boolean
  },
  deleteError: string,
  deleteButton: {
    text: string,
    disabled: boolean
  }
};

interface RequestData {
  readonly success: boolean;
}

class Account extends Component<Props, State> {
  private title: string = titles.account;

  private updateUsername: any = createRef();
  private deleteUsername: any = createRef();

  constructor(props: Props) {
    super(props);

    this.state = {
      updateError: '',
      updateButton: {
        text: 'update',
        disabled: false
      },
      deleteError: '',
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

  setUpdateFormData(updateError: string) {
    this.setState({
      updateError,
      updateButton: {
        text: 'update',
        disabled: false
      }
    });
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

  async changeUsername(event: any) {
    event.preventDefault();

    this.setState({
      updateError: '',
      updateButton: {
        text: 'update',
        disabled: true
      }
    });

    const updateUsernameValue: string = validator.unescape(validator.trim(this.updateUsername.value));

    if (!updateUsernameValue) {
      return this.setDeleteFormData('username is missing');
    }

    if (updateUsernameValue.length < 3) {
      return this.setDeleteFormData('username is too short');
    }

    if (updateUsernameValue.length > 15) {
      return this.setDeleteFormData('username is too long');
    }

    if (!updateUsernameValue.match(allowedUsernameChars)) {
      return this.setDeleteFormData('username contains invalid characters');
    }

    if (updateUsernameValue === this.props.auth.username) {
      return this.setDeleteFormData('username is already in use');
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

    if (data.success) {
      this.setUpdateFormData('');
    } else {
      this.setUpdateFormData('could not update username');
    }
  };

  async deleteAccount(event: any) {
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

    if (data.success) {
      this.setDeleteFormData('');

      this.props.logout();
    } else {
      this.setDeleteFormData('could not delete account');
    }
  };

  render() {
    if (!this.props.logged) {
      return <Loading />;
    }

    return (
      <Base title={this.title}>
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
          {this.state.updateError && <Error>{this.state.updateError}</Error>}
          update username
          <br /><br />
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
          {this.state.deleteError && <Error>{this.state.deleteError}</Error>}
          delete account
          <br /><br />
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