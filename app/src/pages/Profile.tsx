import React, { Component, Fragment } from 'react';
import axios, { AxiosResponse } from 'axios';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { isSiteAdmin, getUsername } from '../redux/auth';

import Base from '../components/Base';

import { Paragraph, AdminBadge } from '../styles';

interface Props {
  readonly match: any;
  readonly siteAdmin: boolean;
  readonly username: string;
}

type State = {
  loading: boolean,
  error: string,
  profile: {
    username: string,
    email: string,
    siteAdmin: boolean,
    banned: boolean
  }
};

interface ProfileResponse {
  readonly success: boolean;
  readonly error?: string;
  readonly payload?: {
    readonly username: string;
    readonly email: string;
    readonly siteAdmin: boolean;
    readonly banned: boolean;
  };
}

class Profile extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      loading: true,
      error: '',
      profile: {
        username: '',
        email: '',
        siteAdmin: false,
        banned: false
      }
    };
  };

  componentDidMount() {
    if (this.props.match.params.username) {
      const fetchProfile: Function = async () => {
        this.setState({
          loading: true,
          error: ''
        });

        const request: AxiosResponse = await axios.post('https://api.stemon.me/api/profile', {
          auth: 'profile',
          type: 'getProfile',
          payload: {
            username: this.props.match.params.username
          }
        });

        const data: ProfileResponse = request.data;

        if (data.success && data.payload && !data.error) {
          this.setState({
            loading: false,
            error: '',
            profile: { ...data.payload }
          });
        } else {
          this.setState({
            loading: false,
            error: data.error || 'could not parse profile'
          });
        }
      };

      fetchProfile();
    }
  };

  render() {
    let title: string;

    if (this.state.loading) {
      title = 'loading...';
    } else if (this.state.error) {
      title = 'error';
    } else {
      title = this.state.profile.username;
    }

    return (
      <Base title={title}>
        <Paragraph>
          {this.state.loading && 'loading...'}
          {this.state.error}
          {!this.state.loading && !this.state.error && (
            <Fragment>
              {this.state.profile.username}
              {this.state.profile.siteAdmin && (
                <AdminBadge>
                  admin
                </AdminBadge>
              )}
              {this.state.profile.banned && (
                <AdminBadge>
                  banned
                </AdminBadge>
              )}
              {(this.props.siteAdmin || this.props.username === this.state.profile.username) && (
                <Fragment>
                  <br /><br />
                  email: {this.state.profile.email}
                </Fragment>
              )}
            </Fragment>
          )}
        </Paragraph>
      </Base>
    );
  };
}

const mapStateToProps = createSelector(
  isSiteAdmin,
  getUsername,
  (siteAdmin, username) => ({ siteAdmin, username })
);

export default connect(mapStateToProps)(Profile);