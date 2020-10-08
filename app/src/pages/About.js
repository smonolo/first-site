import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';

import Navigation from '../components/Navigation';

import { Box, Text } from '../styles';

const About = () => (
  <Fragment>
    <Helmet>
      <title>about me</title>
    </Helmet>
    <Box>
      <Text>
        frontend dev, i guess
        <br /><br />
        <Navigation />
      </Text>
    </Box>
  </Fragment>
);

export default About;