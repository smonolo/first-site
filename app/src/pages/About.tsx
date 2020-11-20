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
          href='https://top.gg'
          target='_blank'
        >
          top.gg
        </Anchor>
        . previously at&nbsp;
        <Anchor
          href='https://www.eslgaming.com'
          target='_blank'
        >
          esl
        </Anchor>
        <br /><br />
        why does this site have accounts? idk was testing
      </Paragraph>
    </Base>
  );
};