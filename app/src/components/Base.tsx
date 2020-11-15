import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';

import Navigation from './navigation/Navigation';
import Search from './Search';

import { Box, Text, Title } from '../styles';

interface Props {
  readonly title: string;
  readonly children: any;
}

export default ({ title, children }: Props) => {
  return (
    <Fragment>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Box>
        <Text>
          <Search />
          <br />
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