import React, { Component, createRef, Fragment } from 'react';
import axios, { AxiosResponse } from 'axios';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { getAuth, logout, login, AuthState, LoginResponse } from '../redux/auth';

import { navigation, NavigationItem } from '../constants';
import {
  Dropdown,
  DropdownItem,
  DropdownLink,
  NavigationContainer,
  NavigationLink,
  NavigationLinkBadge,
  NavigationLinkRight,
  UserNavigationName
} from '../styles';

type Props = {
  auth: AuthState,
  logout: Function,
  login: (payload: AuthState) => void
};

class Navigation extends Component<Props> {
  readonly light: boolean;
  private dropdown: any = createRef();

  constructor(props: Props) {
    super(props);

    const localTheme = localStorage.getItem('theme');

    this.light = !localTheme || localTheme !== 'dark';
  };

  componentDidMount() {
    if (localStorage.getItem('jwt')) {
      this.verifyJwt().then();
    } else if (this.props.auth.logged) {
      this.props.logout();
    }
  };

  logout = (event: any) => {
    event.preventDefault();

    if (this.props.auth.logged) {
      this.props.logout();
    }
  };

  toggleTheme = (event: any) => {
    event.preventDefault();

    const theme = localStorage.getItem('theme');

    if (theme && theme === 'dark') {
      localStorage.setItem('theme', 'light');
    } else {
      localStorage.setItem('theme', 'dark');
    }

    window.location.reload();
  };

  verifyJwt = async () => {
    const request: AxiosResponse = await axios.post('/api/auth/verify', {
      auth: 'authVerify',
      type: 'verify',
      payload: {
        jwt: localStorage.getItem('jwt')
      }
    });

    const data: LoginResponse = request.data;

    if (data.success && data.payload && !data.error) {
      this.props.login({
        logged: true,
        ...data.payload
      });
    } else {
      this.props.logout();
    }
  };

  toggleDropdown = () => {
    const display = this.dropdown.style.display;

    if (!display || display === 'none') {
      this.dropdown.style.display = 'block';
    } else {
      this.dropdown.style.display = 'none';
    }
  };

  render() {
    return (
      <NavigationContainer>
        {navigation.map((item: NavigationItem, index: number) => (
          <NavigationLink
            key={`navigation-links-${index}`}
            to={item.path}
          >
            {item.text}
          </NavigationLink>
        ))}
        <NavigationLinkBadge
          to=''
          onClick={event => this.toggleTheme(event)}
        >
          {this.light ? 'dark' : 'light'}
        </NavigationLinkBadge>
        {this.props.auth.logged && (
          <Fragment>
            <UserNavigationName
              onClick={event => {
                event.preventDefault();

                this.toggleDropdown();
              }}
            >
              {this.props.auth.username}
            </UserNavigationName>
            <Dropdown
              ref={(div: HTMLDivElement) => this.dropdown = div}
            >
              {this.props.auth.siteAdmin && !this.props.auth.banned && (
                <DropdownLink to='/admin'>
                  <DropdownItem>
                    admin
                  </DropdownItem>
                </DropdownLink>
              )}
              <DropdownLink to='/account'>
                <DropdownItem>
                  account
                </DropdownItem>
              </DropdownLink>
              <DropdownItem
                onClick={(event: Event) => this.logout(event)}
                noBottom
                logout
              >
                logout
              </DropdownItem>
            </Dropdown>
          </Fragment>
        )}
        {!this.props.auth.logged && (
          <Fragment>
            <NavigationLinkRight to='/login'>
              login
            </NavigationLinkRight>
            <NavigationLinkRight to='/register'>
              register
            </NavigationLinkRight>
          </Fragment>
        )}
      </NavigationContainer>
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