import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { name, version } from '../../../package.json';

import { getGitCommit, GitCommit } from '../../redux/app';

import { Paragraph, Anchor } from '../../styles';

type Props = {
  gitCommit: GitCommit
};

class Info extends Component<Props> {
  render() {
    return (
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
          href={`https://github.com/stemon-me/stemon.me/commit/${this.props.gitCommit.hash}`}
          title={this.props.gitCommit.hash}
          target='_blank'
        >
          {this.props.gitCommit.shortHash}
        </Anchor>
        <br />
        dev: {this.props.gitCommit.committer.name} {`<${this.props.gitCommit.committer.email}>`}
        <br />
        time: {this.props.gitCommit.committedOn}
        <br />
        branch: {this.props.gitCommit.branch}
        <br />
        subject: {this.props.gitCommit.subject}
      </Paragraph>
    );
  };
}

const mapStateToProps = createSelector(
  getGitCommit,
  gitCommit => ({ gitCommit })
);

export default connect(mapStateToProps)(Info);