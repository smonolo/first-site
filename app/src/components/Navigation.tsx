import React, { Component, Fragment } from 'react';
import axios, { AxiosResponse } from 'axios';
import { connect } from 'react-redux';

import { navigation, NavigationItem } from '../constants';

import { store, StoreState } from '../redux/store';
import { getAuth, AuthDispatch } from '../redux/auth';
import { RequestData } from '../pages/Login';

import { NavigationLink } from '../styles';

type Props = {
  dispatch: AuthDispatch;
}

type State = {
  logged: boolean
};

class Navigation extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      logged: getAuth(store.getState()).logged
    };
  };

  componentDidMount() {
    if (localStorage.getItem('jwt')) {
      this.verifyJwt().then();
    } else if (this.state.logged) {
      this.performLogout();
    }
  };

  performLogout() {
    localStorage.removeItem('jwt');

    this.props.dispatch({ type: 'LOGOUT' });

    this.setState({ logged: false });
  };

  logout(event: any) {
    event.preventDefault();

    if (this.state.logged) {
      this.performLogout();
    }
  };

  async verifyJwt() {
    const request: AxiosResponse = await axios.post('/verify', {
      jwt: localStorage.getItem('jwt')
    });

    const data: RequestData = request.data;

    if (data.success && data.payload) {
      this.props.dispatch({
        type: 'LOGIN',
        payload: {
          logged: true,
          ...data.payload
        }
      });

      this.setState({ logged: true });
    } else {
      this.performLogout();
    }
  };

  render() {
    return (
      <Fragment>
        {navigation.map((item: NavigationItem, index: number) => (
          <NavigationLink
            key={`navigation-links-${index}`}
            to={item.path}
          >
            {item.text}
          </NavigationLink>
        ))}
        {this.state.logged && (
          <NavigationLink
            to=''
            onClick={event => this.logout(event)}
          >
            logout
          </NavigationLink>
        )}
        {!this.state.logged && (
          <NavigationLink to='/login'>
            login
          </NavigationLink>
        )}
      </Fragment>
    );
  };
}

const mapStateToProps = (state: StoreState) => ({ ...state });

export default connect(mapStateToProps)(Navigation);