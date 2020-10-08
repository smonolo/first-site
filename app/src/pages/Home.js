import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';

import Navigation from '../components/Navigation';

import { Box, Paragraph, Text, Title } from '../styles';

export const Home = () => (
  <Fragment>
    <Helmet>
      <title>hello</title>
    </Helmet>
    <Box>
      <Text>
        <Title>hello</Title>
        <br />
        <Paragraph>
          i'm a web dev
          <br /><br />
          nothing else to say
        </Paragraph>
        <br />
        <Navigation />
      </Text>
    </Box>
  </Fragment>
);

export default Home;