import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';

const NotFound = () => (
  <Fragment>
    <Helmet>
      <title>nothing here</title>
    </Helmet>
    <div>idk what you are looking for, but it's not here</div>
  </Fragment>
);

export default NotFound;