import React, {Fragment} from 'react';

import { navigation } from '../constants';

import { NavigationLink } from '../styles';

const Navigation: Function = () => (
  <Fragment>
    {navigation.map(item => (
      <NavigationLink to={item.path}>
        {item.text}
      </NavigationLink>
    ))}
  </Fragment>
);

export default Navigation;