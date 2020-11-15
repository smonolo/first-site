import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { Redirect } from 'react-router';
import axios, { AxiosResponse } from 'axios';

import { titles } from '../constants';

import { isLogged, getProfile, logout } from '../redux/auth';

import Base from '../components/Base';

import { AdminBadge, Error, Input, Paragraph, ButtonRed } from '../styles';

type UserProfile = {
  id: string,
  username: string,
  email: string,
  siteAdmin: boolean,
  jwt: string
};

type Props = {
  logged: boolean,
  logout: Function,
  profile: UserProfile
};

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

class Profile extends Component<Props, State> {
  private title: string = titles.profile;

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

    const deleteUsernameValue: string = this.deleteUsername.value;

    if (!deleteUsernameValue) {
      return this.setDeleteFormData('username is missing');
    }

    if (deleteUsernameValue.length < 3) {
      return this.setDeleteFormData('username is too short');
    }

    if (deleteUsernameValue.length > 15) {
      return this.setDeleteFormData('username is too long');
    }

    if (deleteUsernameValue !== this.props.profile.username) {
      return this.setDeleteFormData('username is incorrect');
    }

    if (this.props.profile.siteAdmin) {
      return this.setDeleteFormData('cannot delete account as site admin');
    }

    this.deleteUsername.value = '';

    const request: AxiosResponse = await axios.post('/auth/account', {
      auth: 'authAccount',
      username: deleteUsernameValue,
      propsUsername: this.props.profile.username,
      jwt: this.props.profile.jwt,
      siteAdmin: this.props.profile.siteAdmin,
      type: 'deleteAccount'
    });

    const data: RequestData = request.data;

    if (data.success) {
      localStorage.removeItem('jwt');

      this.props.logout();
    } else {
      this.setDeleteFormData('could not delete account');
    }
  };

  render() {
    if (!this.props.logged) {
      return <Redirect to='/' />;
    }

    return (
      <Base title={this.title}>
        <Paragraph>
          hi {this.props.profile.username}
          {this.props.profile.siteAdmin && (
            <AdminBadge>
              admin
            </AdminBadge>
          )}
          <br /><br />
          id: {this.props.profile.id}
          <br />
          email: {this.props.profile.email}
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
  getProfile,
  (logged, profile) => ({ logged, profile })
);

const mapDispatchToProps = {
  logout
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);