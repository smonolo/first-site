import React from 'react';
import { Helmet } from 'react-helmet';

const NotFound = () => (
  <React.Fragment>
    <Helmet>
      <title>nothing here</title>
    </Helmet>
    <div>idk what you are looking for, but it's not here</div>
  </React.Fragment>
);

export default NotFound;