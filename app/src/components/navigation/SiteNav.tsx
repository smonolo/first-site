import React, { Component, Fragment } from 'react';

import { navigation, NavigationItem } from '../../constants';

import { NavigationLink, NavigationLinkBadge, NavigationLinkRight, NavigationLinkRightLogout } from '../../styles';

interface Props {
  readonly logged: boolean;
  readonly logout: Function;
}

class SiteNav extends Component<Props> {
  private light: any = !localStorage.getItem('theme') || localStorage.getItem('theme') !== 'dark';

  logout(event: any) {
    event.preventDefault();

    if (this.props.logged) {
      this.props.logout();
    }
  };

  toggleTheme(event: any) {
    event.preventDefault();

    const theme = localStorage.getItem('theme');

    if (theme && theme === 'dark') {
      localStorage.setItem('theme', 'light');
    } else {
      localStorage.setItem('theme', 'dark');
    }

    window.location.reload();
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
        <NavigationLinkBadge
          to=''
          onClick={event => this.toggleTheme(event)}
        >
          {this.light ? 'dark' : 'light'}
        </NavigationLinkBadge>
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