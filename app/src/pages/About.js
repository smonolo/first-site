import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';

import Navigation from '../components/Navigation';

import { Anchor, Box, Paragraph, Text, Title } from '../styles';

const About = () => (
  <Fragment>
    <Helmet>
      <title>about</title>
    </Helmet>
    <Box>
      <Text>
        <Title>about</Title>
        <br />
        <Paragraph>
          frontend dev
          <br /><br />
          i work at&nbsp;
          <Anchor href='https://www.eslgaming.com' target='_blank'>esl</Anchor>
          &nbsp;for&nbsp;
          <Anchor href='https://www.badlion.net' target='_blank'>badlion</Anchor>
        </Paragraph>
        <br />
        <Navigation />
      </Text>
    </Box>
  </Fragment>
);

export default About;