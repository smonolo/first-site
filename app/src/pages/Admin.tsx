import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { titles } from '../constants';

import { AuthState, isLogged, isSiteAdmin, login, logout } from '../redux/auth';
import { AdminUser, fetchUsers, getUsers } from '../redux/admin';
import { getGitCommit, GitCommit } from '../redux/app';

import SiteAdmins from '../components/admin/SiteAdmins';
import Users from '../components/admin/Users';
import Info from '../components/admin/Info';

import Base from '../components/Base';
import Loading from '../components/Loading';

interface Props {
  readonly logged: boolean;
  readonly siteAdmin: boolean;
  readonly fetchUsers: Function;
  readonly users: Array<AdminUser>;
  readonly login: (payload: AuthState) => void;
  readonly logout: Function;
  readonly gitCommit: GitCommit;
}

type State = {
  loading: boolean
};

class Admin extends Component<Props, State> {
  private title: string = titles.admin;

  constructor(props: Props) {
    super(props);

    this.state = {
      loading: false
    };
  };

  componentDidMount() {
    if (!this.props.logged || !this.props.siteAdmin) {
      return window.location.assign('/');
    }

    this.props.fetchUsers();
  };

  componentDidUpdate(nextProps: Readonly<Props>) {
    if (!this.props.logged || !this.props.siteAdmin) {
      return window.location.assign('/');
    }

    if (nextProps.users !== this.props.users) {
      this.setState({
        loading: false
      });
    }
  };

  render() {
    if (!this.props.logged || !this.props.siteAdmin) {
      return <Loading />;
    }

    return (
      <Base title={this.title}>
        <Info gitCommit={this.props.gitCommit} />
        <br />
        <Users
          loading={this.state.loading}
          users={this.props.users}
          login={this.props.login}
          logout={this.props.logout}
          fetchUsers={this.props.fetchUsers}
        />
        <br />
        <SiteAdmins />
      </Base>
    );
  };
}

const mapStateToProps = createSelector(
  isLogged,
  isSiteAdmin,
  getUsers,
  getGitCommit,
  (logged, siteAdmin, users, gitCommit) => ({ logged, siteAdmin, users, gitCommit })
);

const mapDispatchToProps = {
  fetchUsers,
  login,
  logout
};

export default connect(mapStateToProps, mapDispatchToProps)(Admin);