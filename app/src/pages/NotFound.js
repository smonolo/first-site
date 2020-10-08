import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';

import { Box, Text, Anchor } from './Home';

const NotFound = () => (
  <Fragment>
    <Helmet>
      <title>nothing here</title>
    </Helmet>
    <Box>
      <Text>
        idk what you are looking for, but it's not here
        <br /><br />
        you better go <Anchor to='/'>home</Anchor>
      </Text>
    </Box>
  </Fragment>
);

export default NotFound;