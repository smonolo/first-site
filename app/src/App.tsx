import React  from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Admin from './pages/Admin';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

import { GlobalStyle } from './styles';

// all values are readonly as they should not be edited
interface Page {
  readonly exact: boolean;
  readonly path: string;
  readonly component: any;
}

type Pages = Array<Page>;

const pages: Pages = [
  { exact: true, path: '/', component: Home },
  { exact: true, path: '/about', component: About },
  { exact: true, path: '/contact', component: Contact },
  { exact: true, path: '/login', component: Login },
  { exact: true, path: '/admin', component: Admin },
  { exact: true, path: '/profile', component: Profile },
  { exact: true, path: '', component: NotFound }
];

export default () => (
  <BrowserRouter>
    <GlobalStyle />
    <Switch>
      {pages.map((page: Page, index: number) => (
        <Route
          key={`app-routes-${index}`}
          exact={page.exact}
          path={page.path}
          component={page.component}
        />
      ))}
    </Switch>
  </BrowserRouter>
);