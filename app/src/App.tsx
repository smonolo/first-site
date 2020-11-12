import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

import { GlobalStyle } from './styles';

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
  { exact: true, path: '', component: NotFound },
];

const App: Function = () => (
  <BrowserRouter>
    <GlobalStyle />
    <Switch>
      {pages.map(page => (
        <Route
          exact={page.exact}
          path={page.path}
          component={page.component}
        />
      ))}
    </Switch>
  </BrowserRouter>
);

export default App;