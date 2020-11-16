import React, { Fragment, Component, createRef } from 'react';
import axios, { AxiosResponse } from 'axios';
import validator from 'validator';

import { allowedEmailChars } from '../../constants';

import { Paragraph, Input, Error, ButtonRed } from '../../styles';

interface Props {
  readonly loading: boolean;
  readonly users: Array<string>;
}

type State = {
  deleteError: string,
  deleteButton: {
    text: string,
    disabled: boolean
  }
};

interface DeleteUserResponse {
  readonly success: boolean;
}

class Users extends Component<Props, State> {
  private deleteUsername: any = createRef();

  constructor(props: Props) {
    super(props);

    this.state = {
      deleteError: '',
      deleteButton: {
        text: 'delete',
        disabled: false
      }
    };
  };

  setDeleteFormData(deleteError: string) {
    this.setState({
      deleteError,
      deleteButton: {
        text: 'delete',
        disabled: false
      }
    });
  };

  async deleteUser(event: any) {
    event.preventDefault();

    this.setState({
      deleteError: '',
      deleteButton: {
        text: 'loading',
        disabled: true
      }
    });

    const deleteUsernameValue: string = validator.unescape(validator.trim(this.deleteUsername.value));

    if (!deleteUsernameValue) {
      return this.setDeleteFormData('username is missing');
    }

    if (deleteUsernameValue.length < 3) {
      return this.setDeleteFormData('username is too short');
    }

    if (deleteUsernameValue.length > 320) {
      return this.setDeleteFormData('username is too long');
    }

    if (!deleteUsernameValue.match(allowedEmailChars)) {
      return this.setDeleteFormData('username contains invalid characters');
    }

    this.deleteUsername.value = '';

    const request: AxiosResponse = await axios.post('/api/admin/users', {
      auth: 'adminUsers',
      type: 'deleteUser',
      payload: {
        jwt: localStorage.getItem('jwt'),
        username: deleteUsernameValue
      }
    });

    const data: DeleteUserResponse = request.data;

    if (data.success) {
      this.setDeleteFormData('');
    } else {
      this.setDeleteFormData('could not delete user');
    }
  };

  render() {
    return (
      <Paragraph>
        users
        <br /><br />
        {this.props.loading && 'loading users...'}
        {!this.props.loading && (
          <Fragment>
            count: {this.props.users.length}
            <br />
            list: {this.props.users.join(', ')}
          </Fragment>
        )}
        <br /><br />
        {this.state.deleteError && <Error>{this.state.deleteError}</Error>}
        delete user
        <br /><br />
        username or email
        <br />
        <Input
          type='text'
          name='deleteUsername'
          minLength={3}
          maxLength={320}
          ref={(input: HTMLInputElement) => this.deleteUsername = input}
          required
        />
        <br /><br />
        <ButtonRed
          type='submit'
          disabled={this.state.deleteButton.disabled}
          onClick={event => this.deleteUser(event)}
        >
          {this.state.deleteButton.text}
        </ButtonRed>
      </Paragraph>
    );
  };
}

export default Users;