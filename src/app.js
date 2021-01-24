import React, {
  Suspense, lazy, useContext, useEffect,
} from 'react';
import t from 'prop-types';
import { Redirect, Route, Switch } from 'react-router-dom';
import { LinearProgress } from '@material-ui/core';
import firebase from './services/firebase';
import { AuthContext } from './contexts/auth';
/**
 * Com lazy loading, o import fica mais dinâmico, porque só é importado aquela página
 * que foi requesitada, não é importada todas de uma vez como se fosse o import normal
 */
const Main = lazy(() => import('./pages/Main'));
const Login = lazy(() => import('./pages/Login'));

function App({ location }) {
  const { setUserInfo, userInfo } = useContext(AuthContext);

  const { isUserLoggedIn } = userInfo;

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

  if (isUserLoggedIn) {
    if (location.pathname === '/login') {
      console.log('usuário está logado e está no /login, então redirect to home "/"');
      return <Redirect to="/" />;
    }
    console.log('usuário está logado MAS NÃO está na página de login');
  } else {
    console.log('usuário não está logado, redirecionar para /login');
    if (location.pathname !== '/login') {
      console.log('usuário não está logado, nem está na página de login');
      return <Redirect to="/login" />;
    }
  }

  return (
    <Suspense fallback={<LinearProgress />}>
      <Switch>
        <Route path="/login" component={Login} />
        <Route component={Main} />
      </Switch>
    </Suspense>
  );
}

App.propTypes = {
  location: t.objectOf.isRequired,
};

export default App;
