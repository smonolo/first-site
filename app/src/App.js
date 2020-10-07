import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';

import Home from './pages/Home';
import NotFound from './pages/NotFound';

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Consolas', sans-serif;
    font-size: 16px;
  }
`;

const App = () => (
  <BrowserRouter>
    <GlobalStyle />
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='' component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default App;