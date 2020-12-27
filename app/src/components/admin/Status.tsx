import React, { Component, Fragment } from 'react';
import https from 'https';

import { Paragraph, Button, GreenBadge, AdminBadge } from '../../styles';

type Props = {};

type State = {
  loading: boolean,
  services: {
    [service: string]: {
      online: boolean,
      statusCode: number
    }
  }
};

const services: Array<string> = [
  'cdn.stemon.me'
];

class Status extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      loading: true,
      services: {}
    };
  };

  componentDidMount() {
    this.checkServices();
  };

  checkServices = () => {
    this.setState({
      loading: true
    });

    services.forEach(service => {
      https
        .get(`https://${service}/`, res => {
          this.setState({
            services: {
              ...this.state.services,
              [service]: {
                online: true,
                statusCode: res.statusCode || -1
              }
            }
          });
        })
        .on('error', () => {
          this.setState({
            services: {
              ...this.state.services,
              [service]: {
                online: false,
                statusCode: -1
              }
            }
          });
        });
    });

    this.setState({
      loading: false
    });
  };

  render() {
    return (
      <Paragraph>
        status
        <br /><br />
        {
          this.state.loading ? (
            'loading services...'
          ) : (
            <Fragment>
              {Object.keys(this.state.services).map((service: string, index: number) => (
                <div key={`admin-status-${index}`}>
                  {service}:
                  {
                    this.state.services[service].online ? (
                      <GreenBadge>
                        online
                      </GreenBadge>
                    ) : (
                      <AdminBadge>
                        offline
                      </AdminBadge>
                    )
                  }
                  &nbsp;({this.state.services[service].statusCode})
                </div>
              ))}
              <br />
              <Button
                onClick={event => {
                  event.preventDefault();

                  this.checkServices();
                }}
              >
                refresh
              </Button>
            </Fragment>
          )
        }
      </Paragraph>
    );
  };
}

export default Status;