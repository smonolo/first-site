import React from 'react';

import { name, version } from '../../../package.json';

import { GitCommit } from '../../redux/app';

import { Paragraph, Anchor } from '../../styles';

interface Props {
  readonly gitCommit: GitCommit;
}

export default ({ gitCommit }: Props) => (
  <Paragraph>
    app info
    <br /><br />
    name: {name}
    <br />
    version: {version}
    <br /><br />
    git info
    <br /><br />
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
  </Paragraph>
);