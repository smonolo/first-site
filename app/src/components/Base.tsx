import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { isBanned } from '../redux/auth';

import Navigation from './Navigation';
import Search from './Search';

import { Box, Container, NavBox, Text, Title, RedBanner } from '../styles';

type Props = {
  title: string,
  banned: boolean,
  children: any
};

const Base = ({ title, banned, children }: Props) => {
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
        {banned && (
          <Fragment>
            <RedBanner>
              your account is currently banned, you must have done something weird...
            </RedBanner>
            <br />
          </Fragment>
        )}
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

const mapStateToProps = createSelector(
  isBanned,
  banned => ({ banned })
);

export default connect(mapStateToProps)(Base);