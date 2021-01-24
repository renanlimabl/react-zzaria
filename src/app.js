import React, { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import { LinearProgress } from '@material-ui/core';
/**
 * Com lazy loading, o import fica mais dinâmico, porque só é importado aquela página
 * que foi requesitada, não é importada todas de uma vez como se fosse o import normal
 */
const Main = lazy(() => import('./pages/Main'));
const Login = lazy(() => import('./pages/Login'));

function App() {
  return (
    <Suspense fallback={<LinearProgress />}>
      <Switch>
        <Route path="/login" component={Login} />
        <Route component={Main} />
      </Switch>
    </Suspense>
  );
}

export default App;
