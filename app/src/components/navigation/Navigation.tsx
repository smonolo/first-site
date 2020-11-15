import React, { Component, Fragment } from 'react';
import axios, { AxiosResponse } from 'axios';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { getAuth, logout, login, AuthState, LoginResponse } from '../../redux/auth';

import UserNav from './UserNav';
import SiteNav from './SiteNav';

type Props = {
  auth: AuthState,
  logout: Function,
  login: (payload: AuthState) => void
}

class Navigation extends Component<Props> {
  componentDidMount() {
    if (localStorage.getItem('jwt')) {
      this.verifyJwt().then();
    } else if (this.props.auth.logged) {
      this.props.logout();
    }
  };

  async verifyJwt() {
    const request: AxiosResponse = await axios.post('/api/auth/verify', {
      auth: 'authVerify',
      type: 'verify',
      payload: {
        jwt: localStorage.getItem('jwt')
      }
    });

    const data: LoginResponse = request.data;

    if (data.success && data.payload) {
      this.props.login({
        logged: true,
        ...data.payload
      });
    } else {
      this.props.logout();
    }
  };

  render() {
    return (
      <Fragment>
        {this.props.auth.logged && (
          <UserNav
            username={this.props.auth.username}
            siteAdmin={this.props.auth.siteAdmin}
          />
        )}
        <SiteNav
          logged={this.props.auth.logged}
          logout={this.props.logout}
        />
      </Fragment>
    );
  };
}

const mapStateToProps = createSelector(
  getAuth,
  auth => ({ auth })
);

const mapDispatchToProps = {
  logout,
  login
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);