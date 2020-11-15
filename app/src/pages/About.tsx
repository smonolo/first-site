import React from 'react';

import { titles } from '../constants';

import Base from '../components/Base';

import { Anchor, Paragraph } from '../styles';

export default () => {
  const title: string = titles.about;

  return (
    <Base title={title}>
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
    </Base>
  );
};