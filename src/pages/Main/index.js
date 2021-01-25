import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import {
  AppBar,
  Toolbar as MaterialToobar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
} from '@material-ui/core';

import { AccountCircle } from '@material-ui/icons';
import { ReactComponent as MainLogo } from '../Login/logo-react-zzaria.svg';
import { AuthContext } from '../../contexts/auth';

const Main = () => {
  const [anchorElement, setAnchorElement] = useState(null);
  const { logout, userInfo } = useContext(AuthContext);

  const handleOpenMenu = (e) => {
    setAnchorElement(e.target);
  };

  const handleClose = () => {
    setAnchorElement(null);
  };

  return (
    <AppBar>
      <Toolbar>
        <LogoContainer>
          <Logo />
        </LogoContainer>
        <Typography>
          {`Olá ${userInfo.user.displayName.split(' ')[0]} =)`}
        </Typography>
        <IconButton color="inherit" onClick={handleOpenMenu}>
          <AccountCircle />
        </IconButton>
        <Menu
          open={!!anchorElement}
          onClose={handleClose}
          anchorEl={anchorElement}
        >
          <MenuItem onClick={logout}>Sair</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

const LogoContainer = styled.div`
  flex-grow: 1;
`;

const Logo = styled(MainLogo)`
  width: 200px;
  height: 50px;

  & path {
    fill: #fff;
  }

  & line {
    stroke: #fff;
  }
`;

const Toolbar = styled(MaterialToobar)`
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
`;

export default Main;
