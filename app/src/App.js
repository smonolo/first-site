import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';

import Home from './pages/Home';
import About from './pages/About';
import NotFound from './pages/NotFound';

const GlobalStyle = createGlobalStyle`
  body {
    user-select: none;
    margin: 0;
    padding: 0;
  }
`;

const App = () => (
  <BrowserRouter>
    <GlobalStyle />
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/about' component={About} />
      <Route exact path='' component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default App;