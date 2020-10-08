import React, { Fragment } from 'react';

import { NavigationLink } from '../styles';

const Navigation = () => (
  <Fragment>
    <NavigationLink to='/'>home</NavigationLink>
    <NavigationLink to='/about'>about</NavigationLink>
    <NavigationLink to='/contact'>contact</NavigationLink>
  </Fragment>
);

export default Navigation;