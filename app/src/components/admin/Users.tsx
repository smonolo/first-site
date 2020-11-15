import React, { Fragment } from 'react';

import { Paragraph } from '../../styles';

interface Props {
  readonly loading: boolean;
  readonly users: Array<string>;
}

export default ({ loading, users }: Props) => (
  <Paragraph>
    users
    <br /><br />
    {loading && 'loading users...'}
    {!loading && (
      <Fragment>
        count: {users.length}
        <br />
        list: {users.join(', ')}
      </Fragment>
    )}
  </Paragraph>
);