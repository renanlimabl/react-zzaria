import React, {
  Suspense, lazy, useContext, useEffect,
} from 'react';
import { Route, Switch } from 'react-router-dom';
import { LinearProgress } from '@material-ui/core';
import firebase from './services/firebase';
import { AuthContext } from './contexts/auth';
/**
 * Com lazy loading, o import fica mais dinâmico, porque só é importado aquela página
 * que foi requesitada, não é importada todas de uma vez como se fosse o import normal
 */
const Main = lazy(() => import('./pages/Main'));
const Login = lazy(() => import('./pages/Login'));

function App() {
  const { setUserInfo } = useContext(AuthContext);

  // Verifica se o user está logado.
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      console.log('dados do usuário: ', user);
      setUserInfo(
        {
          isUserLoggedIn: !!user,
          user,
        },
      );
    });
  }, []);

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
