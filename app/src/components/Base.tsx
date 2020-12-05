import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';

import Navigation from './Navigation';
import Search from './Search';

import { Box, Container, NavBox, Text, Title } from '../styles';

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
      <Container>
        <NavBox>
          <Navigation />
          <br />
          <Search />
        </NavBox>
        <br />
        <Box>
          <Text>
            <Title>{title}</Title>
            <br />
            {children}
          </Text>
        </Box>
      </Container>
    </Fragment>
  );
};