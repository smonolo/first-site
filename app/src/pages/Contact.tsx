import React from 'react';

import { titles } from '../constants';

import Base from '../components/Base';

import { Mail, Paragraph } from '../styles';

export default () => {
  const title: string = titles.contact;

  return (
    <Base title={title}>
      <Paragraph>
        send me an email
        <br /><br />
        <Mail href='mailto:hi@stemon.me'>
          hi@stemon.me
        </Mail>
      </Paragraph>
    </Base>
  );
};