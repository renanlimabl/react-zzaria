import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './pages/Login';
import Main from './pages/Main';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Main} />
      <Route path="/login" component={Login} />
    </Switch>
  </BrowserRouter>
);

export default App;
