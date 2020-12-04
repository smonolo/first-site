import React, { Fragment } from 'react';

import { UserNavigation, UserNavigationLink, UserNavigationName } from '../../styles';

interface Props {
  readonly username: string;
  readonly siteAdmin: boolean;
  readonly banned: boolean;
}

export default ({ username, siteAdmin, banned }: Props) => (
  <Fragment>
    <UserNavigation>
      {siteAdmin && !banned && (
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