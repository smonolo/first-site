import React, { Component, createRef, Fragment } from 'react';
import axios, { AxiosResponse } from 'axios';
import validator from 'validator';

import { allowedEmailChars } from '../../constants';

import { Button, ButtonRed, Error, Info, Input, Paragraph } from '../../styles';

interface Props {
  readonly banned: boolean
}

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

interface SiteAdminResponse {
  readonly success: boolean;
  readonly error?: string;
}

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

    const assignUsernameValue: string = validator.unescape(validator.trim(this.assignUsername.value));

    if (this.props.banned) {
      return this.setAssignFormData('you are currently banned');
    }

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

    if (data.success && !data.error) {
      this.setAssignFormData('', 'site admin assigned');

      setTimeout(() => {
        this.setState({ assignInfo: '' });
      }, 5000);
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

    if (data.success && !data.error) {
      this.setRevokeFormData('', 'site admin revoked');

      setTimeout(() => {
        this.setState({ revokeInfo: '' });
      }, 5000);
    } else {
      this.setRevokeFormData(data.error);
    }
  };

  render() {
    return (
      <Fragment>
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
      </Fragment>
    );
  };
}

export default SiteAdmins;