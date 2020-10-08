import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

import { GlobalStyle } from './styles';

const App = () => (
  <BrowserRouter>
    <GlobalStyle />
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/about' component={About} />
      <Route exact path='/contact' component={Contact} />
      <Route exact path='' component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default App;