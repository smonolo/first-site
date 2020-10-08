import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';

import Navigation from '../components/Navigation';

import { Box, Text } from '../styles';

const NotFound = () => (
  <Fragment>
    <Helmet>
      <title>nothing here</title>
    </Helmet>
    <Box>
      <Text>
        idk what you are looking for, but it's not here
        <br /><br />
        <Navigation />
      </Text>
    </Box>
  </Fragment>
);

export default NotFound;