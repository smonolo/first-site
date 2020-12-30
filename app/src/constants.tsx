import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import Admin from './pages/Admin';
import Account from './pages/Account';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

interface Titles {
  readonly home: string;
  readonly about: string;
  readonly contact: string;
  readonly login: string;
  readonly register: string;
  readonly admin: string;
  readonly account: string;
  readonly notFound: string;
}

export interface NavigationItem {
  readonly text: string;
  readonly path: string;
}

type Navigation = Array<NavigationItem>;

export interface Page {
  readonly exact: boolean;
  readonly path: string;
  readonly component: any;
}

type Pages = Array<Page>;

export const titles: Titles = {
  home: 'home',
  about: 'about',
  contact: 'contact',
  login: 'login',
  register: 'register',
  admin: 'admin',
  account: 'account',
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

export const pages: Pages = [
  { exact: true, path: '/', component: Home },
  { exact: true, path: '/about', component: About },
  { exact: true, path: '/contact', component: Contact },
  { exact: true, path: '/login', component: Login },
  { exact: true, path: '/register', component: Register },
  { exact: true, path: '/admin', component: Admin },
  { exact: true, path: '/account', component: Account },
  { exact: true, path: '/:username', component: Profile },
  { exact: true, path: '', component: NotFound }
];

export const disallowedUsernames: string[] = [
  'about',
  'contact',
  'login',
  'register',
  'admin',
  'account'
];

export const allowedUsernameChars: RegExp = /[A-Za-z0-9_]/g;

export const allowedEmailChars: RegExp = /[A-Za-z0-9@_.]/g;

export const allowedPasswordChars: RegExp = /[A-Za-z0-9/\\{}#,!_@():;.|`$=+\-*[\]^?&~%"']/g;