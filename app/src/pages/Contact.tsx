import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';

import { titles } from '../constants';

import Navigation from '../components/Navigation';

import { Box, Mail, Paragraph, Text, Title } from '../styles';

export default () => {
  const title: string = titles.contact;

  return (
    <Fragment>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Box>
        <Text>
          <Title>{title}</Title>
          <br />
          <Paragraph>
            send me an email
            <br /><br />
            <Mail
              href='mailto:hi@stemon.me'
            >
              hi@stemon.me
            </Mail>
          </Paragraph>
          <br />
          <Navigation />
        </Text>
      </Box>
    </Fragment>
  );
};