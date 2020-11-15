import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { pages, Page } from './constants';

import { GlobalStyle } from './styles';

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