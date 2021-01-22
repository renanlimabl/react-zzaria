import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { CssBaseline, LinearProgress } from '@material-ui/core';

/**
 * Com lazy loading, o import fica mais dinâmico, porque só é importado aquela página
 * que foi requesitada, não é importada todas de uma vez como se fosse o import normal
 */
const Main = lazy(() => import('./pages/Main'));
const Login = lazy(() => import('./pages/Login'));

const App = () => (
  <>
    <CssBaseline />
    <BrowserRouter>
      <Suspense fallback={<LinearProgress />}>
        <Switch>
          <Route path="/login" component={Login} />
          <Route component={Main} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  </>
);

export default App;
