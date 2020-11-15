import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { Redirect } from 'react-router';

import { titles } from '../constants';

import { isLogged, isSiteAdmin } from '../redux/auth';

import Base from '../components/Base';

import { Paragraph } from '../styles';

type Props = {
  logged: boolean,
  siteAdmin: boolean
};

class Admin extends Component<Props> {
  private title: string = titles.admin;

  render() {
    if (!this.props.logged || !this.props.siteAdmin) {
      return <Redirect to='/' />;
    }

    return (
      <Base title={this.title}>
        <Paragraph>
          admin
          <br /><br />
          work in progress
        </Paragraph>
      </Base>
    );
  };
}

const mapStateToProps = createSelector(
  isLogged,
  isSiteAdmin,
  (logged, siteAdmin) => ({ logged, siteAdmin })
);

export default connect(mapStateToProps)(Admin);