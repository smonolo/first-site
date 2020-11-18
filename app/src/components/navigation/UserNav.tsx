import React, { Fragment } from 'react';

import { UserNavigation, UserNavigationLink, UserNavigationName } from '../../styles';

interface Props {
  readonly username: string;
  readonly siteAdmin: boolean;
}

export default ({ username, siteAdmin }: Props) => (
  <Fragment>
    <UserNavigation>
      {siteAdmin && (
        <UserNavigationLink to='/admin'>
          admin
        </UserNavigationLink>
      )}
      <UserNavigationLink to='/account'>
        account
      </UserNavigationLink>
      <UserNavigationName to={`/profile/${username}`}>
        {username}
      </UserNavigationName>
    </UserNavigation>
    <br />
  </Fragment>
);