import React, { Component, createRef } from 'react';
import axios, { AxiosResponse } from 'axios';
import { connect } from 'react-redux';

import { isUsernameEmailInvalid } from '../../utils/form';

import { LoginResponse, AuthState, login, logout } from '../../redux/auth';

import { Paragraph, Input, Error, Info, Button } from '../../styles';

type Props = {
  login: (payload: AuthState) => void,
  logout: Function
};

type State = {
  error: string,
  info: string,
  button: {
    text: string,
    disabled: boolean
  }
};

class LoginUser extends Component<Props, State> {
  private username: any = createRef();

  constructor(props: Props) {
    super(props);

    this.state = {
      error: '',
      info: '',
      button: {
        text: 'login',
        disabled: false
      }
    };
  };

  setFormData(error: string = '', info: string = '', data: any = {}) {
    this.setState({
      error,
      info,
      button: {
        text: 'login',
        disabled: false
      }
    });

    if (!error) {
      this.username.value = '';

      setTimeout(() => {
        this.setState({ info: '' });

        this.props.logout();

        this.props.login({
          logged: true,
          ...data.payload
        });
      }, 5000);
    }
  };

  async loginAsUser(event: any) {
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

    const request: AxiosResponse = await axios.post('/api/admin/users', {
      auth: 'adminUsers',
      type: 'loginAsUser',
      payload: {
        jwt: localStorage.getItem('jwt'),
        username: this.username.value
      }
    });

    const data: LoginResponse = request.data;

    if (data.success && data.payload && !data.error) {
      this.setFormData('', 'logging in as user', data);
    } else {
      this.setFormData(data.error);
    }
  };

  render() {
    return (
      <Paragraph>
        login as user
        <br /><br />
        {this.state.error && <Error>{this.state.error}</Error>}
        {this.state.info && <Info>{this.state.info}</Info>}
        username or email
        <br />
        <Input
          type='text'
          name='loginUsername'
          minLength={3}
          maxLength={320}
          ref={(input: HTMLInputElement) => this.username = input}
          required
        />
        <br /><br />
        <Button
          type='submit'
          disabled={this.state.button.disabled}
          onClick={event => this.loginAsUser(event)}
        >
          {this.state.button.text}
        </Button>
      </Paragraph>
    );
  };
}

const mapDispatchToProps = {
  login,
  logout
};

export default connect(null, mapDispatchToProps)(LoginUser);