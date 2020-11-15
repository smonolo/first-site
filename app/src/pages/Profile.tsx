import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { Redirect } from 'react-router';

import { titles } from '../constants';

import { isLogged, getProfile } from '../redux/auth';

import Base from '../components/Base';

import { AdminBadge, Paragraph } from '../styles';

type UserProfile = {
  id: string,
  username: string,
  email: string,
  siteAdmin: boolean
};

type Props = {
  logged: boolean
  profile: UserProfile
};

class Profile extends Component<Props> {
  private title: string = titles.profile;

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
      </Base>
    );
  };
}

const mapStateToProps = createSelector(
  isLogged,
  getProfile,
  (logged, profile) => ({ logged, profile })
);

export default connect(mapStateToProps)(Profile);