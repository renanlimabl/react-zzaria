import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Button, Grid } from '@material-ui/core';
import { ReactComponent as MainLogo } from './logo-react-zzaria.svg';

const firebaseConfig = {
  apiKey: 'AIzaSyDlLV2m0q0iUeWzyDbE32eVekOefD_yaoM',
  authDomain: 'reactzzaria-b4c50.firebaseapp.com',
  projectId: 'reactzzaria-b4c50',
  storageBucket: 'reactzzaria-b4c50.appspot.com',
  messagingSenderId: '317894399452',
  appId: '1:317894399452:web:9773e7f17d9ca37e7eab19',
  measurementId: 'G-J4QJ0BQV5Y',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const Login = () => {
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
          isUserLoggedIn: !!userInfo.user,
          user: userInfo.user,
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

  const login = useCallback(() => {
    const provider = new firebase.auth.GithubAuthProvider();
    firebase.auth().signInWithRedirect(provider);
  });

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
};

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
