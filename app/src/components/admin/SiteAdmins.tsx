import React, { Component, createRef } from 'react';
import axios, { AxiosResponse } from 'axios';
import validator from 'validator';

import { allowedEmailChars } from '../../constants';

import { Button, ButtonRed, Error, Input, Paragraph } from '../../styles';

interface Props {}

type State = {
  assignError: string,
  assignButton: {
    text: string,
    disabled: boolean
  },
  revokeError: string,
  revokeButton: {
    text: string,
    disabled: boolean
  }
};

interface SiteAdminResponse {
  readonly success: boolean;
}

class SiteAdmins extends Component<Props, State> {
  private assignUsername: any = createRef();
  private revokeUsername: any = createRef();

  constructor(props: Props) {
    super(props);

    this.state = {
      assignError: '',
      assignButton: {
        text: 'assign',
        disabled: false
      },
      revokeError: '',
      revokeButton: {
        text: 'revoke',
        disabled: false
      }
    };
  };

  setAssignFormData(assignError: string) {
    this.setState({
      assignError,
      assignButton: {
        text: 'assign',
        disabled: false
      }
    });
  };

  setRevokeFormData(revokeError: string) {
    this.setState({
      revokeError,
      revokeButton: {
        text: 'revoke',
        disabled: false
      }
    });
  };

  async assignSiteAdmin(event: any) {
    event.preventDefault();

    this.setState({
      assignError: '',
      assignButton: {
        text: 'loading',
        disabled: true
      }
    });

    const assignUsernameValue: string = validator.unescape(validator.trim(this.assignUsername.value));

    if (!assignUsernameValue) {
      return this.setAssignFormData('username is missing');
    }

    if (assignUsernameValue.length < 3) {
      return this.setAssignFormData('username is too short');
    }

    if (assignUsernameValue.length > 320) {
      return this.setAssignFormData('username is too long');
    }

    if (!assignUsernameValue.match(allowedEmailChars)) {
      return this.setAssignFormData('username contains invalid characters');
    }

    this.assignUsername.value = '';

    const request: AxiosResponse = await axios.post('/api/admin/site-admins', {
      auth: 'adminSiteAdmins',
      type: 'assignSiteAdmin',
      payload: {
        username: assignUsernameValue,
        jwt: localStorage.getItem('jwt')
      }
    });

    const data: SiteAdminResponse = request.data;

    if (data.success) {
      this.setAssignFormData('');
    } else {
      this.setAssignFormData('could not assign site admin');
    }
  };

  async revokeSiteAdmin(event: any) {
    event.preventDefault();

    this.setState({
      revokeError: '',
      revokeButton: {
        text: 'loading',
        disabled: true
      }
    });

    const revokeUsernameValue: string = validator.unescape(validator.trim(this.revokeUsername.value));

    if (!revokeUsernameValue) {
      return this.setRevokeFormData('username is missing');
    }

    if (revokeUsernameValue.length < 3) {
      return this.setRevokeFormData('username is too short');
    }

    if (revokeUsernameValue.length > 320) {
      return this.setRevokeFormData('username is too long');
    }

    if (!revokeUsernameValue.match(allowedEmailChars)) {
      return this.setRevokeFormData('username contains invalid characters');
    }

    this.revokeUsername.value = '';

    const request: AxiosResponse = await axios.post('/api/admin/site-admins', {
      auth: 'adminSiteAdmins',
      type: 'revokeSiteAdmin',
      payload: {
        username: revokeUsernameValue,
        jwt: localStorage.getItem('jwt')
      }
    });

    const data: SiteAdminResponse = request.data;

    if (data.success) {
      this.setRevokeFormData('');
    } else {
      this.setRevokeFormData('could not revoke site admin');
    }
  };

  render() {
    return (
      <Paragraph>
        site admins
        <br /><br />
        {this.state.assignError && (<Error>{this.state.assignError}</Error>)}
        assign site admin
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
        <br /><br />
        {this.state.revokeError && (<Error>{this.state.revokeError}</Error>)}
        revoke site admin
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
    );
  };
}

export default SiteAdmins;