import React, { Fragment } from 'react';

import { name, version } from '../../../package.json';

import { GitCommit } from '../../redux/app';

import { Paragraph, Anchor } from '../../styles';

interface Props {
  readonly gitCommit: GitCommit;
  readonly banned: boolean;
}

export default ({ gitCommit, banned }: Props) => (
  <Paragraph>
    app info
    <br /><br />
    {
      banned ? (
        <Fragment>
          access denied. you are banned
        </Fragment>
      ) : (
        <Fragment>
          name: {name}
          <br />
          version: {version}
        </Fragment>
      )
    }
    <br /><br />
    git info
    <br /><br />
    {
      banned ? (
        <Fragment>
          access denied. you are banned
        </Fragment>
      ) : (
        <Fragment>
          hash:&nbsp;
          <Anchor
            href={`https://github.com/stemon-me/stemon.me/commit/${gitCommit.hash}`}
            title={gitCommit.hash}
            target='_blank'
          >
            {gitCommit.shortHash}
          </Anchor>
          <br />
          dev: {gitCommit.committer.name} {`<${gitCommit.committer.email}>`}
          <br />
          time: {gitCommit.committedOn}
          <br />
          branch: {gitCommit.branch}
          <br />
          subject: {gitCommit.subject}
        </Fragment>
      )
    }
  </Paragraph>
);