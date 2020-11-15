import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';

import Navigation from '../components/Navigation';

import { Box, Text, Title } from '../styles';

type Props = {
  title: string,
  children: any
};

export default ({ title, children }: Props) => {
  return (
    <Fragment>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Box>
        <Text>
          <Title>{title}</Title>
          <br />
          {children}
          <br />
          <Navigation />
        </Text>
      </Box>
    </Fragment>
  );
};