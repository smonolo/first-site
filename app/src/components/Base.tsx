import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';

import Navigation from './navigation/Navigation';
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
        <br />
        <NavBox>
          <Navigation />
        </NavBox>
      </Container>
    </Fragment>
  );
};