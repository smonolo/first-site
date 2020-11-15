import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';

import { titles } from '../constants';

import Navigation from '../components/Navigation';

import { Box, Paragraph, Text, Title } from '../styles';

export default () => {
  const title: string = titles.notFound;

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
            idk what you are looking for, but it's not here
          </Paragraph>
          <br />
          <Navigation />
        </Text>
      </Box>
    </Fragment>
  );
};