import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { titles } from '../constants';

import { isLogged, isSiteAdmin, isBanned } from '../redux/auth';

import SiteAdmins from '../components/admin/SiteAdmins';
import Users from '../components/admin/Users';
import Info from '../components/admin/Info';
import DeleteUser from '../components/admin/DeleteUser';
import Bans from '../components/admin/Bans';

import Base from '../components/Base';
import Loading from '../components/Loading';
import LoginUser from '../components/admin/LoginUser';

interface Props {
  readonly logged: boolean;
  readonly siteAdmin: boolean;
  readonly banned: boolean;
}

class Admin extends Component<Props> {
  private title: string = titles.admin;

  isAuthorized = () => {
    return this.props.logged && this.props.siteAdmin && !this.props.banned;
  };

  render() {
    if (!this.isAuthorized()) {
      return <Loading />;
    }

    return (
      <Base
        title={this.title}
      >
        <Info />
        <br />
        <Users />
        <br />
        <LoginUser />
        <br />
        <Bans />
        <br />
        <SiteAdmins />
        <br />
        <DeleteUser />
      </Base>
    );
  };
}

const mapStateToProps = createSelector(
  isLogged,
  isSiteAdmin,
  isBanned,
  (logged, siteAdmin, banned) => ({ logged, siteAdmin, banned })
);

export default connect(mapStateToProps)(Admin);