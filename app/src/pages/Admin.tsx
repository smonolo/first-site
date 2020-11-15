import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { titles } from '../constants';

import { isLogged, isSiteAdmin } from '../redux/auth';
import { fetchUsers, getUsers } from '../redux/admin';

import SiteAdmins from '../components/admin/SiteAdmins';
import Users from '../components/admin/Users';

import Base from '../components/Base';
import Loading from '../components/Loading';

interface Props {
  readonly logged: boolean;
  readonly siteAdmin: boolean;
  readonly fetchUsers: Function;
  readonly users: Array<string>;
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
        <Users
          loading={this.state.loading}
          users={this.props.users}
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
  (logged, siteAdmin, users) => ({ logged, siteAdmin, users })
);

const mapDispatchToProps = {
  fetchUsers
};

export default connect(mapStateToProps, mapDispatchToProps)(Admin);