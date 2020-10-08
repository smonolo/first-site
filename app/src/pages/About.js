import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';

import { Box, Text, Anchor } from './Home';

const About = () => (
  <Fragment>
    <Helmet>
      <title>about me</title>
    </Helmet>
    <Box>
      <Text>
        frontend dev, i guess
        <br /><br />
        <Anchor to='/'>home</Anchor>
      </Text>
    </Box>
  </Fragment>
);

export default About;