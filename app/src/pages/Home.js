import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';

const Home = () => (
  <Fragment>
    <Helmet>
      <title>hello</title>
    </Helmet>
    <div>hi</div>
    <div>this is supposed to look good</div>
    <div>maybe in the future</div>
    <div>bye</div>
  </Fragment>
);

export default Home;