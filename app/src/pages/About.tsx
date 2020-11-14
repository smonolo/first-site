import React, { Fragment, FunctionComponent } from 'react';
import { Helmet } from 'react-helmet';

import { titles } from '../constants';

import Navigation from '../components/Navigation';

import { Anchor, Box, Paragraph, Text, Title } from '../styles';

const About: FunctionComponent = () => {
  const title: string = titles.about;

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
            frontend dev
            <br /><br />
            i work at&nbsp;
            <Anchor
              href='https://www.eslgaming.com'
              target='_blank'
            >
              esl
            </Anchor>
            &nbsp;for&nbsp;
            <Anchor
              href='https://www.badlion.net'
              target='_blank'
            >
              badlion
            </Anchor>
          </Paragraph>
          <br />
          <Navigation />
        </Text>
      </Box>
    </Fragment>
  );
};

export default About;