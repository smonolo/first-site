import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';

import Navigation from '../components/Navigation';

import { Box, Mail, Paragraph, Text, Title } from '../styles';

const Contact = () => (
  <Fragment>
    <Helmet>
      <title>contact</title>
    </Helmet>
    <Box>
      <Text>
        <Title>contact</Title>
        <br />
        <Paragraph>
          send me an email
          <br /><br />
          <Mail href='mailto:hi@stemon.me'>hi@stemon.me</Mail>
        </Paragraph>
        <br />
        <Navigation />
      </Text>
    </Box>
  </Fragment>
);

export default Contact;