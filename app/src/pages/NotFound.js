import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';

import Navigation from '../components/Navigation';

import { Box, Paragraph, Text, Title } from '../styles';

const NotFound = () => (
  <Fragment>
    <Helmet>
      <title>not found</title>
    </Helmet>
    <Box>
      <Text>
        <Title>not found</Title>
        <br />
        <Paragraph>
          idk what you are looking for, but it's not here
        </Paragraph>
        <br />
        <Navigation />
      </Text>
    </Box>
  </Fragment>
);

export default NotFound;