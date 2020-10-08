import React, { Fragment } from 'react';

import { Anchor } from '../styles';

const Navigation = () => (
  <Fragment>
    <Anchor to='/'>home</Anchor>
    <Anchor to='/about'>about</Anchor>
    <Anchor to='/contact'>contact</Anchor>
  </Fragment>
);

export default Navigation;