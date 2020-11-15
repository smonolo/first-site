// readonly interfaces & types
interface Titles {
  readonly home: string;
  readonly about: string;
  readonly contact: string;
  readonly login: string;
  readonly register: string;
  readonly admin: string;
  readonly profile: string;
  readonly notFound: string;
}

export interface NavigationItem {
  readonly text: string;
  readonly path: string;
}

type Navigation = Array<NavigationItem>;

// exports
export const titles: Titles = {
  home: 'home',
  about: 'about',
  contact: 'contact',
  login: 'login',
  register: 'register',
  admin: 'admin',
  profile: 'profile',
  notFound: 'not found'
};

export const navigation: Navigation = [
  {
    text: 'home',
    path: '/'
  },
  {
    text: 'about',
    path: '/about'
  },
  {
    text: 'contact',
    path: '/contact'
  }
];

export const mainColor: string = '#008cff';