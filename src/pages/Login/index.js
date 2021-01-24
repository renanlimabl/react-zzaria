import React, {
  useContext,
} from 'react';
import styled from 'styled-components';
import { Button, Grid } from '@material-ui/core';

import { AuthContext } from '../../contexts/auth';
import { ReactComponent as MainLogo } from './logo-react-zzaria.svg';

function Login() {
  const { login } = useContext(AuthContext);

  return (
    <Container>
      <Grid container justify="center" spacing={10}>
        <Grid item>
          <Logo style={{ width: '100%' }} />
        </Grid>
        <Grid item container justify="center" xs={12}>
          <GithubButton onClick={login}>
            Entrar com Github
          </GithubButton>
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
