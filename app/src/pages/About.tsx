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
        &nbsp;for&nbsp;
        <Anchor
          href='https://www.badlion.net'
          target='_blank'
        >
          badlion client
        </Anchor>
        <br /><br />
        also working on&nbsp;
        <Anchor
          href='https://digicale.com'
          target='_blank'
        >
          digicale
        </Anchor>
        <br /><br />
        why does this site have accounts? idk was testing
        <br /><br />
        some stuff i've worked on:
        <br /><br />
        <Anchor
          href='https://stemon.me'
          target='_blank'
        >
          stemon.me
        </Anchor>
        <br />
        <Anchor
          href='https://digicale.com'
          target='_blank'
        >
          digicale.com
        </Anchor>
        <br />
        <Anchor
          href='https://accounts.digicale.com'
          target='_blank'
        >
          accounts.digicale.com
        </Anchor>
        <br />
        <Anchor
          href='https://digicale.it'
          target='_blank'
        >
          digicale.it
        </Anchor>
        <br />
        <Anchor
          href='https://top.gg'
          target='_blank'
        >
          top.gg
        </Anchor>
        <br />
        <Anchor
          href='https://auctions.top.gg'
          target='_blank'
        >
          auctions.top.gg
        </Anchor>
        <br />
        <Anchor
          href='https://client.badlion.net'
          target='_blank'
        >
          client.badlion.net
        </Anchor>
        <br />
        <Anchor
          href='https://store.badlion.net'
          target='_blank'
        >
          store.badlion.net
        </Anchor>
        <br />
        <Anchor
          href='https://teamlegnanonuoto.it'
          target='_blank'
        >
          teamlegnanonuoto.it
        </Anchor>
        <br />
        <Anchor
          href='https://rechargepvp.com'
          target='_blank'
        >
          rechargepvp.com
        </Anchor>
        <br />
        <Anchor
          href='https://gylliebot.net'
          target='_blank'
        >
          gylliebot.net
        </Anchor>
        <br />
        <Anchor
          href='https://purox.me'
          target='_blank'
        >
          purox.me
        </Anchor>
        &nbsp;(shut down)
        <br />
        <Anchor
          href='https://atox.dev'
          target='_blank'
        >
          atox.dev
        </Anchor>
        &nbsp;(shut down)
        <br />
        <Anchor
          href='https://atoxnetwork.com'
          target='_blank'
        >
          atoxnetwork.com
        </Anchor>
        &nbsp;(shut down)
        <br />
        <Anchor
          href='https://crate.rip'
          target='_blank'
        >
          crate.rip
        </Anchor>
        &nbsp;(shut down)
        <br />
        <Anchor
          href='https://hytalesquare.net'
          target='_blank'
        >
          hytalesquare.net
        </Anchor>
        &nbsp;(shut down)
        <br />
        <Anchor
          href='https://devibot.net'
          target='_blank'
        >
          devibot.net
        </Anchor>
        &nbsp;(shut down)
        <br />
        <Anchor
          href='https://devigames.net'
          target='_blank'
        >
          devigames.net
        </Anchor>
        &nbsp;(shut down)
      </Paragraph>
    </Base>
  );
};