import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { AdminUser, fetchUsers, getUsers } from '../../redux/admin';

import { Paragraph, Button, AdminBadge } from '../../styles';

type Props = {
  users: Array<AdminUser>,
  fetchUsers: Function
};

type State = {
  loading: boolean
};

class Users extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      loading: true
    };
  };

  componentDidMount() {
    this.fetchUsers();
  };

  componentDidUpdate(nextProps: Readonly<Props>) {
    if (nextProps.users !== this.props.users) {
      this.setState({
        loading: false
      });
    }
  };

  fetchUsers = (event: any = null) => {
    if (event) {
      event.preventDefault();
    }

    this.setState({
      loading: true
    });

    this.props.fetchUsers();
  };

  render() {
    return (
      <Paragraph>
        {this.state.loading && 'loading users...'}
        {!this.state.loading && (
          <Fragment>
            users
            <br /><br />
            count: {this.props.users.length}
            <br />
            list:
            <ul>
              {this.props.users.map((user: AdminUser, index: number) => (
                <li
                  key={`admin-users-${index}`}
                >
                  {user.username} {user.email && `(${user.email})`}
                  {user.siteAdmin && (
                    <AdminBadge>admin</AdminBadge>
                  )}
                  {user.banned && (
                    <AdminBadge>banned</AdminBadge>
                  )}
                </li>
              ))}
            </ul>
            <Button
              onClick={event => this.fetchUsers(event)}
            >
              refresh
            </Button>
          </Fragment>
        )}
      </Paragraph>
    );
  };
}

const mapStateToProps = createSelector(
  getUsers,
  users => ({ users })
);

const mapDispatchToProps = {
  fetchUsers
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);