import React, { Component, Fragment } from 'react';
import axios, { AxiosResponse } from 'axios';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { navigation, NavigationItem } from '../constants';

import {
  isLogged,
  getUsername,
  isSiteAdmin,
  logout,
  login,
  AuthState
} from '../redux/auth';
import { RequestData } from '../pages/Login';

import {
  NavigationLink,
  NavigationLinkRight,
  UserNavigation,
  UserNavigationLink,
  UserNavigationName
} from '../styles';

type Props = {
  logged: boolean,
  username: string,
  siteAdmin: boolean,
  logout: Function,
  login: (payload: AuthState) => void
};

type State = {};

class Navigation extends Component<Props, State> {
  componentDidMount() {
    if (localStorage.getItem('jwt')) {
      this.verifyJwt().then();
    } else if (this.props.logged) {
      this.performLogout();
    }
  };

  performLogout() {
    localStorage.removeItem('jwt');

    this.props.logout();
  };

  logout(event: any) {
    event.preventDefault();

    if (this.props.logged) {
      this.performLogout();
    }
  };

  async verifyJwt() {
    const request: AxiosResponse = await axios.post('/auth/verify', {
      auth: 'authVerify',
      jwt: localStorage.getItem('jwt')
    });

    const data: RequestData = request.data;

    if (data.success && data.payload) {
      this.props.login({
        logged: true,
        ...data.payload
      });
    } else {
      this.performLogout();
    }
  };

  render() {
    return (
      <Fragment>
        {this.props.logged && (
          <Fragment>
            <UserNavigation>
              {this.props.siteAdmin && (
                <UserNavigationLink to='/admin'>
                  admin
                </UserNavigationLink>
              )}
              <UserNavigationLink to='/profile'>
                profile
              </UserNavigationLink>
              <UserNavigationName>
                {this.props.username}
              </UserNavigationName>
            </UserNavigation>
            <br />
          </Fragment>
        )}
        {navigation.map((item: NavigationItem, index: number) => (
          <NavigationLink
            key={`navigation-links-${index}`}
            to={item.path}
          >
            {item.text}
          </NavigationLink>
        ))}
        {this.props.logged && (
          <NavigationLinkRight
            to=''
            onClick={event => this.logout(event)}
          >
            logout
          </NavigationLinkRight>
        )}
        {!this.props.logged && (
          <Fragment>
            <NavigationLinkRight to='/login'>
              login
            </NavigationLinkRight>
            <NavigationLinkRight to='/register'>
              register
            </NavigationLinkRight>
          </Fragment>
        )}
      </Fragment>
    );
  };
}

const mapStateToProps = createSelector(
  isLogged,
  getUsername,
  isSiteAdmin,
  (logged, username, siteAdmin) => ({ logged, username, siteAdmin })
);

const mapDispatchToProps = {
  logout,
  login
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);