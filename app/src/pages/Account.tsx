import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import axios, { AxiosResponse } from 'axios';

import { allowedUsernameChars, titles } from '../constants';

import { isLogged, logout, getAuth, AuthState } from '../redux/auth';

import Base from '../components/Base';
import Loading from '../components/Loading';

import { AdminBadge, Error, Input, Paragraph, ButtonRed } from '../styles';
import validator from 'validator';

interface Props {
  readonly logged: boolean;
  readonly logout: Function;
  readonly auth: AuthState;
}

type State = {
  deleteError: string
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

  private deleteUsername: any = createRef();

  constructor(props: Props) {
    super(props);

    this.state = {
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

  setDeleteFormData(deleteError: string) {
    this.setState({
      deleteError,
      deleteButton: {
        text: 'delete',
        disabled: false
      }
    });
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
          {this.state.deleteError && <Error>{this.state.deleteError}</Error>}
          delete account
          <br /><br />
          username
          <br />
          <Input
            type='text'
            name='username'
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