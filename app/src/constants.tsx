interface Titles {
  readonly home: string;
  readonly about: string;
  readonly contact: string;
  readonly notFound: string;
}

export const titles: Titles = {
  home: 'hello',
  about: 'about',
  contact: 'contact',
  notFound: 'not found'
};

interface NavigationItem {
  readonly text: string;
  readonly path: string;
}

type Navigation = Array<NavigationItem>;

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