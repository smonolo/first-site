import React, { Component, createRef } from 'react';
import axios, { AxiosResponse } from 'axios';

import { isUsernameEmailInvalid } from '../../utils/form';
import { ApiResponse } from '../../types';

import { Paragraph, Input, Error, Info, ButtonRed } from '../../styles';

type Props = {};

type State = {
  error: string,
  info: string,
  button: {
    text: string,
    disabled: boolean
  }
};

class DeleteUser extends Component<Props, State> {
  private username: any = createRef();

  constructor(props: Props) {
    super(props);

    this.state = {
      error: '',
      info: '',
      button: {
        text: 'delete',
        disabled: false
      }
    };
  };

  setFormData(error: string = '', info: string = '') {
    this.setState({
      error,
      info,
      button: {
        text: 'delete',
        disabled: false
      }
    });

    if (!error) {
      this.username.value = '';

      setTimeout(() => {
        this.setState({ info: '' });
      }, 5000);
    }
  };

  async deleteUser(event: any) {
    event.preventDefault();

    this.setState({
      error: '',
      info: '',
      button: {
        text: 'loading',
        disabled: true
      }
    });

    const invalid = isUsernameEmailInvalid(this.username.value);

    if (invalid) {
      return this.setFormData(invalid);
    }

    const request: AxiosResponse = await axios.post('https://api.stemon.me/api/admin/users', {
      auth: 'adminUsers',
      type: 'deleteUser',
      payload: {
        jwt: localStorage.getItem('jwt'),
        username: this.username.value
      }
    });

    const data: ApiResponse = request.data;

    if (data.success && !data.error) {
      this.setFormData('', 'user deleted');
    } else {
      this.setFormData(data.error);
    }
  };

  render() {
    return (
      <Paragraph>
        delete user
        <br /><br />
        {this.state.error && <Error>{this.state.error}</Error>}
        {this.state.info && <Info>{this.state.info}</Info>}
        username or email
        <br />
        <Input
          type='text'
          name='deleteUsername'
          minLength={3}
          maxLength={320}
          ref={(input: HTMLInputElement) => this.username = input}
          required
        />
        <br /><br />
        <ButtonRed
          type='submit'
          disabled={this.state.button.disabled}
          onClick={event => this.deleteUser(event)}
        >
          {this.state.button.text}
        </ButtonRed>
      </Paragraph>
    );
  };
}

export default DeleteUser;