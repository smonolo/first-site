import React, { Component, Fragment } from 'react';

import { navigation, NavigationItem } from '../../constants';

import { NavigationLink, NavigationLinkRight, NavigationLinkRightLogout } from '../../styles';

interface Props {
  readonly logged: boolean;
  readonly logout: Function;
}

class SiteNav extends Component<Props> {
  logout(event: any) {
    event.preventDefault();

    if (this.props.logged) {
      this.props.logout();
    }
  };

  render() {
    return (
      <Fragment>
        {navigation.map((item: NavigationItem, index: number) => (
          <NavigationLink
            key={`navigation-links-${index}`}
            to={item.path}
          >
            {item.text}
          </NavigationLink>
        ))}
        {this.props.logged && (
          <NavigationLinkRightLogout
            to=''
            onClick={event => this.logout(event)}
          >
            logout
          </NavigationLinkRightLogout>
        )}
        {!this.props.logged && (
          <Fragment>
            <NavigationLinkRight to='/login'>
              login
            </NavigationLinkRight>
            <NavigationLinkRight to='/register'>
              register
            </NavigationLinkRight>
          </Fragment>
        )}
      </Fragment>
    );
  };
}

export default SiteNav;