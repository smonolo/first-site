import React, { Component, createRef } from 'react';
import axios, { AxiosResponse } from 'axios';

import { ApiResponse } from '../../types';
import { isUsernameEmailInvalid } from '../../utils/form';

import { Paragraph, Input, Error, Info, ButtonRed, Button, ToolContainer } from '../../styles';

type Props = {};

type State = {
  banError: string,
  banInfo: string,
  banButton: {
    text: string,
    disabled: boolean
  },
  unbanError: string,
  unbanInfo: string,
  unbanButton: {
    text: string,
    disabled: boolean
  }
};

class Bans extends Component<Props, State> {
  private banUsername: any = createRef();
  private unbanUsername: any = createRef();

  constructor(props: Props) {
    super(props);

    this.state = {
      banError: '',
      banInfo: '',
      banButton: {
        text: 'ban',
        disabled: false
      },
      unbanError: '',
      unbanInfo: '',
      unbanButton: {
        text: 'unban',
        disabled: false
      }
    };
  };

  setBanFormData(banError: string = '', banInfo: string = '') {
    this.setState({
      banError,
      banInfo,
      banButton: {
        text: 'ban',
        disabled: false
      }
    });

    if (!banError) {
      this.banUsername.value = '';

      setTimeout(() => {
        this.setState({ banInfo: '' });
      }, 5000);
    }
  };

  setUnbanFormData(unbanError: string = '', unbanInfo: string = '') {
    this.setState({
      unbanError,
      unbanInfo,
      unbanButton: {
        text: 'unban',
        disabled: false
      }
    });

    if (!unbanError) {
      this.unbanUsername.value = '';

      setTimeout(() => {
        this.setState({ unbanInfo: '' });
      }, 5000);
    }
  };

  async banUser(event: any) {
    event.preventDefault();

    this.setState({
      banError: '',
      banInfo: '',
      banButton: {
        text: 'loading',
        disabled: true
      }
    });

    const invalid = isUsernameEmailInvalid(this.banUsername.value);

    if (invalid) {
      return this.setBanFormData(invalid);
    }

    const request: AxiosResponse = await axios.post('/api/admin/users', {
      auth: 'adminUsers',
      type: 'banUser',
      payload: {
        jwt: localStorage.getItem('jwt'),
        username: this.banUsername.value
      }
    });

    const data: ApiResponse = request.data;

    if (data.success && !data.error) {
      this.setBanFormData('', 'user banned');
    } else {
      this.setBanFormData(data.error);
    }
  };

  async unbanUser(event: any) {
    event.preventDefault();

    this.setState({
      unbanError: '',
      unbanInfo: '',
      unbanButton: {
        text: 'loading',
        disabled: true
      }
    });

    const invalid = isUsernameEmailInvalid(this.unbanUsername.value);

    if (invalid) {
      return this.setUnbanFormData(invalid);
    }

    const request: AxiosResponse = await axios.post('/api/admin/users', {
      auth: 'adminUsers',
      type: 'unbanUser',
      payload: {
        jwt: localStorage.getItem('jwt'),
        username: this.unbanUsername.value
      }
    });

    const data: ApiResponse = request.data;

    if (data.success && !data.error) {
      this.setUnbanFormData('', 'user unbanned');
    } else {
      this.setUnbanFormData(data.error);
    }
  };

  render() {
    return (
      <ToolContainer>
        bans
        <br /><br />
        <Paragraph>
          ban user
          <br /><br />
          {this.state.banError && <Error>{this.state.banError}</Error>}
          {this.state.banInfo && <Info>{this.state.banInfo}</Info>}
          username or email
          <br />
          <Input
            type='text'
            name='banUsername'
            minLength={3}
            maxLength={320}
            ref={(input: HTMLInputElement) => this.banUsername = input}
            required
          />
          <br /><br />
          <ButtonRed
            type='submit'
            disabled={this.state.banButton.disabled}
            onClick={event => this.banUser(event)}
          >
            {this.state.banButton.text}
          </ButtonRed>
        </Paragraph>
        <br />
        <Paragraph>
          unban user
          <br /><br />
          {this.state.unbanError && <Error>{this.state.unbanError}</Error>}
          {this.state.unbanInfo && <Info>{this.state.unbanInfo}</Info>}
          username or email
          <br />
          <Input
            type='text'
            name='unbanUsername'
            minLength={3}
            maxLength={320}
            ref={(input: HTMLInputElement) => this.unbanUsername = input}
            required
          />
          <br /><br />
          <Button
            type='submit'
            disabled={this.state.unbanButton.disabled}
            onClick={event => this.unbanUser(event)}
          >
            {this.state.unbanButton.text}
          </Button>
        </Paragraph>
      </ToolContainer>
    );
  };
}

export default Bans;