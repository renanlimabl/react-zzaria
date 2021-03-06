import React, {
  Suspense, lazy, useContext, useEffect, useState,
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
  const { setUserInfo, userInfo, logout } = useContext(AuthContext);
  const [didCheckUserIn, setDidCheckUserIn] = useState(false);

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
      setDidCheckUserIn(true);
    });

    window.logout = logout;
  }, []);

  if (!didCheckUserIn) {
    return <LinearProgress />;
  }

  if (isUserLoggedIn && location.pathname === '/login') {
    return <Redirect to="/" />;
  }

  if (!isUserLoggedIn && location.pathname !== '/login') {
    return <Redirect to="/login" />;
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
  location: t.PropTypes.shape({
    pathname: t.PropTypes.string.isRequired,
  }).isRequired,
};

export default App;
