import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';

import Navigation from '../components/Navigation';

import { Box, Mail, Text } from '../styles';

const Contact = () => (
  <Fragment>
    <Helmet>
      <title>contact me</title>
    </Helmet>
    <Box>
      <Text>
        just send me an email
        <br /><br />
        <Mail href='mailto:hi@stemon.me'>hi@stemon.me</Mail>
        <br /><br />
        <Navigation />
      </Text>
    </Box>
  </Fragment>
);

export default Contact;