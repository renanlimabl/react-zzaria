import React, {
  useState, useEffect, useCallback, useContext,
} from 'react';
import styled from 'styled-components';
import { Button, Grid } from '@material-ui/core';
import firebase from '../../services/firebase';

import { AuthContext } from '../../contexts/auth';
import { ReactComponent as MainLogo } from './logo-react-zzaria.svg';

function Login() {
  const { login } = useContext(AuthContext);

  const [userInfo, setUserInfo] = useState({
    isUserLoggedIn: false,
    user: null,
  });

  const { isUserLoggedIn, user } = userInfo;

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

  // useCallback só executa 1 vez com o segundo parâmetro vazio "[]", parecido com o useEffect,
  // mas o segundo parâmetro "[]" e o useCallback irá executar toda vez que esse parâmetro mudar
  const logout = useCallback(() => {
    firebase.auth().signOut().then(() => {
      console.log('deslogou');
      setUserInfo({
        isUserLoggedIn: false,
        user: null,
      });
    });
  }, []);

  return (
    <Container>
      <Grid container justify="center" spacing={10}>
        <Grid item>
          <Logo style={{ width: '100%' }} />
        </Grid>
        <Grid item container justify="center" xs={12}>
          {isUserLoggedIn && (
            <>
              <pre>{user.displayName}</pre>
              <Button variant="contained" onClick={logout}>
                Sair
              </Button>
            </>
          )}
          {!isUserLoggedIn && (
            <GithubButton onClick={login}>
              Entrar com Github
            </GithubButton>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}

const Container = styled.div`
  padding: 40px;
`;

const Logo = styled(MainLogo)`
  width: 100%;
`;

const GithubButton = styled(Button).attrs({
  variant: 'contained',
  fullWidth: true,
})`
  && {
    font-size: 20px;
    padding: 15px;
    text-transform: none;
    max-width: 480px;
  }
`;

export default Login;
