import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';

import Login from './pages/Login';
import Main from './pages/Main';

const App = () => (
  <>
    <CssBaseline />
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login} />
        <Route component={Main} />
      </Switch>
    </BrowserRouter>
  </>
);

export default App;
