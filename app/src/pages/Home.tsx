import React from 'react';

import { titles } from '../constants';

import Base from '../components/Base';

import { Paragraph } from '../styles';

export default () => {
  const title: string = titles.home;

  return (
    <Base title={title}>
      <Paragraph>
        i'm a web dev
        <br /><br />
        that's it
      </Paragraph>
    </Base>
  );
};