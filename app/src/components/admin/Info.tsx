import React from 'react';

import { name, version } from '../../../package.json';

import { GitCommit } from '../../redux/app';

import { Paragraph } from '../../styles';

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
    <span title={gitCommit.hash}>
      hash: {gitCommit.shortHash}
    </span>
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