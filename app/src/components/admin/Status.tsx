import React, { Component } from 'react';
import https from 'https';

import { Paragraph } from '../../styles';

type Props = {};

type Service = {
  [x: string]: boolean
};

type State = {
  services: Array<Service>
};

const services = [
  'https://stemon.me/',
  'https://images.stemon.me/',
  'https://api.stemon.me'
];

class Status extends Component<Props, State> {
  componentDidMount() {
    this.checkServices();
  };

  checkServices = () => {
    services.forEach(service => {
      https
        .get(service, res => {
          console.log(res);
        })
        .on('error', error => {
          console.log(error);
        });
    });
  };

  render() {
    return (
      <Paragraph>
        status
        <br /><br />
        working
      </Paragraph>
    );
  };
}

export default Status;