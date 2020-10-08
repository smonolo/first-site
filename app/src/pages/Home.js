import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Box = styled.div`
  padding: 50px 70px;
  width: fit-content;
  margin-top: 25vh;
  margin-left: auto;
  margin-right: auto;
  background-color: #eeeeee;
  max-width: 90%;
  box-sizing: border-box;
`;

export const Text = styled.div`
  font-family: 'Consolas', sans-serif;
  font-size: 16px;
`;

export const Anchor = styled(Link)`
  color: #000000;
  
  &:hover {
    color: #000000;
  }
`;

export const Home = () => (
  <Fragment>
    <Helmet>
      <title>hello</title>
    </Helmet>
    <Box>
      <Text>
        hi
        <br /><br />
        this is supposed to look good
        <br />
        maybe in the future
        <br /><br />
        <Anchor to='/about'>about me</Anchor>
      </Text>
    </Box>
  </Fragment>
);

export default Home;