import React, { Component, createRef } from 'react';
import axios, { AxiosResponse } from 'axios';

import { ApiResponse } from '../../types';
import { isUsernameEmailInvalid } from '../../utils/form';

import { Button, ButtonRed, Error, Info, Input, Paragraph, ToolContainer } from '../../styles';

type Props = {};

type State = {
  assignError: string,
  assignInfo: string,
  assignButton: {
    text: string,
    disabled: boolean
  },
  revokeError: string,
  revokeInfo: string,
  revokeButton: {
    text: string,
    disabled: boolean
  }
};

class SiteAdmins extends Component<Props, State> {
  private assignUsername: any = createRef();
  private revokeUsername: any = createRef();

  constructor(props: Props) {
    super(props);

    this.state = {
      assignError: '',
      assignInfo: '',
      assignButton: {
        text: 'assign',
        disabled: false
      },
      revokeError: '',
      revokeInfo: '',
      revokeButton: {
        text: 'revoke',
        disabled: false
      }
    };
  };

  setAssignFormData(assignError: string = '', assignInfo: string = '') {
    this.setState({
      assignError,
      assignInfo,
      assignButton: {
        text: 'assign',
        disabled: false
      }
    });

    if (!assignError) {
      this.assignUsername.value = '';

      setTimeout(() => {
        this.setState({ assignInfo: '' });
      }, 5000);
    }
  };

  setRevokeFormData(revokeError: string = '', revokeInfo: string = '') {
    this.setState({
      revokeError,
      revokeInfo,
      revokeButton: {
        text: 'revoke',
        disabled: false
      }
    });

    if (!revokeError) {
      this.revokeUsername.value = '';

      setTimeout(() => {
        this.setState({ revokeInfo: '' });
      }, 5000);
    }
  };

  async assignSiteAdmin(event: any) {
    event.preventDefault();

    this.setState({
      assignError: '',
      assignInfo: '',
      assignButton: {
        text: 'loading',
        disabled: true
      }
    });

    const invalid = isUsernameEmailInvalid(this.assignUsername.value);

    if (invalid) {
      return this.setAssignFormData(invalid);
    }

    const request: AxiosResponse = await axios.post('/api/admin/site-admins', {
      auth: 'adminSiteAdmins',
      type: 'assignSiteAdmin',
      payload: {
        jwt: localStorage.getItem('jwt'),
        username: this.assignUsername.value
      }
    });

    const data: ApiResponse = request.data;

    if (data.success && !data.error) {
      this.setAssignFormData('', 'site admin assigned');
    } else {
      this.setAssignFormData(data.error);
    }
  };

  async revokeSiteAdmin(event: any) {
    event.preventDefault();

    this.setState({
      revokeError: '',
      revokeInfo: '',
      revokeButton: {
        text: 'loading',
        disabled: true
      }
    });

    const invalid = isUsernameEmailInvalid(this.revokeUsername.value);

    if (invalid) {
      return this.setRevokeFormData(invalid);
    }

    const request: AxiosResponse = await axios.post('/api/admin/site-admins', {
      auth: 'adminSiteAdmins',
      type: 'revokeSiteAdmin',
      payload: {
        jwt: localStorage.getItem('jwt'),
        username: this.revokeUsername.value
      }
    });

    const data: ApiResponse = request.data;

    if (data.success && !data.error) {
      this.setRevokeFormData('', 'site admin revoked');
    } else {
      this.setRevokeFormData(data.error);
    }
  };

  render() {
    return (
      <ToolContainer>
        site admins
        <br /><br />
        <Paragraph>
          assign site admin
          <br /><br />
          {this.state.assignError && (<Error>{this.state.assignError}</Error>)}
          {this.state.assignInfo && (<Info>{this.state.assignInfo}</Info>)}
          username or email
          <br />
          <Input
            type='text'
            name='assignUsername'
            minLength={3}
            maxLength={320}
            ref={(input: HTMLInputElement) => this.assignUsername = input}
            required
          />
          <br /><br />
          <Button
            type='submit'
            disabled={this.state.assignButton.disabled}
            onClick={event => this.assignSiteAdmin(event)}
          >
            {this.state.assignButton.text}
          </Button>
        </Paragraph>
        <br />
        <Paragraph>
          revoke site admin
          <br /><br />
          {this.state.revokeError && (<Error>{this.state.revokeError}</Error>)}
          {this.state.revokeInfo && (<Info>{this.state.revokeInfo}</Info>)}
          username or email
          <br />
          <Input
            type='text'
            name='revokeUsername'
            minLength={3}
            maxLength={320}
            ref={(input: HTMLInputElement) => this.revokeUsername = input}
            required
          />
          <br /><br />
          <ButtonRed
            type='submit'
            disabled={this.state.revokeButton.disabled}
            onClick={event => this.revokeSiteAdmin(event)}
          >
            {this.state.revokeButton.text}
          </ButtonRed>
        </Paragraph>
      </ToolContainer>
    );
  };
}

export default SiteAdmins;