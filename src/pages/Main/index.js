import React from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
} from '@material-ui/core';

import { AccountCircle } from '@material-ui/icons';

import { ReactComponent as MainLogo } from '../Login/logo-react-zzaria.svg';

const Main = () => (
  <AppBar>
    <Toolbar>
      <MainLogo />
      <IconButton color="inherit">
        <AccountCircle />
      </IconButton>
    </Toolbar>
  </AppBar>
);

export default Main;
