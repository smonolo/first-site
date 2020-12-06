import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import axios, { AxiosResponse } from 'axios';

import { pages, Page } from './constants';

import { isLogged, login, logout, LoginResponse, AuthState } from './redux/auth';
import { parseGitCommit } from './redux/app';

import { GlobalStyle } from './styles';

interface Props {
  readonly logged: boolean;
  readonly login: (payload: AuthState) => void;
  readonly logout: Function;
  readonly parseGitCommit: Function;
}

class App extends Component<Props> {
  componentDidMount() {
    this.props.parseGitCommit();

    setInterval(async () => {
      if (this.props.logged && localStorage.getItem('jwt')) {
        const request: AxiosResponse = await axios.post('https://api.stemon.me/api/auth/verify', {
          auth: 'authVerify',
          type: 'refresh',
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
      }
    }, 10000);
  };

  render() {
    return (
      <BrowserRouter>
        <GlobalStyle/>
        <Switch>
          {pages.map((page: Page, index: number) => (
            <Route
              key={`app-routes-${index}`}
              exact={page.exact}
              path={page.path}
              component={page.component}
            />
          ))}
        </Switch>
      </BrowserRouter>
    );
  };
}

const mapStateToProps = createSelector(
  isLogged,
  logged => ({ logged })
);

const mapDispatchToProps = {
  login,
  logout,
  parseGitCommit
};

export default connect(mapStateToProps, mapDispatchToProps)(App);