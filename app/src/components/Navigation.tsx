import React, { Component, Fragment } from 'react';
import axios, { AxiosResponse } from 'axios';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { navigation, NavigationItem } from '../constants';

import { isLogged, getUsername, logout, login, AuthState } from '../redux/auth';
import { RequestData } from '../pages/Login';

import { NavigationLink, UserNavigation, UserNavigationLink, UserNavigationName } from '../styles';

type Props = {
  logged: boolean,
  username: string,
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

    this.setState({ logged: false });
  };

  logout(event: any) {
    event.preventDefault();

    if (this.props.logged) {
      this.performLogout();
    }
  };

  async verifyJwt() {
    const request: AxiosResponse = await axios.post('/verify', {
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
              <UserNavigationLink to='/admin'>
                admin
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
          <NavigationLink
            to=''
            onClick={event => this.logout(event)}
          >
            logout
          </NavigationLink>
        )}
        {!this.props.logged && (
          <NavigationLink to='/login'>
            login
          </NavigationLink>
        )}
      </Fragment>
    );
  };
}

const mapStateToProps = createSelector(
  isLogged,
  getUsername,
  (logged, username) => ({ logged, username })
);

const mapDispatchToProps = {
  logout,
  login
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);