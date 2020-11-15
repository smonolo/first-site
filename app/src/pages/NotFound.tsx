import React from 'react';

import { titles } from '../constants';

import Base from '../components/Base';

import { Paragraph } from '../styles';

export default () => {
  const title: string = titles.notFound;

  return (
    <Base title={title}>
      <Paragraph>
        idk what you are looking for, but it's not here
      </Paragraph>
    </Base>
  );
};