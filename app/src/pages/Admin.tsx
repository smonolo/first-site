import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { Redirect } from 'react-router';

import { titles } from '../constants';

import { isLogged, isSiteAdmin } from '../redux/auth';
import { fetchUsers, getUsers } from '../redux/admin';

import Base from '../components/Base';

import { Paragraph } from '../styles';

type Props = {
  logged: boolean,
  siteAdmin: boolean,
  fetchUsers: Function,
  users: Array<string>
};

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
    this.props.fetchUsers();
  };

  componentDidUpdate(nextProps: Readonly<Props>) {
    if (nextProps.users !== this.props.users) {
      this.setState({
        loading: false
      });
    }
  };

  render() {
    if (!this.props.logged || !this.props.siteAdmin) {
      return <Redirect to='/' />;
    }

    return (
      <Base title={this.title}>
        <Paragraph>
          users
          <br /><br />
          {this.state.loading && 'loading users...'}
          {!this.state.loading && (
            <Fragment>
              count: {this.props.users.length}
              <br />
              list: {this.props.users.join(', ')}
            </Fragment>
          )}
        </Paragraph>
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