import React, { useState } from 'react';
import styled from 'styled-components';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import HomeIcon from '@material-ui/icons/Home';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { useHistory } from 'react-router';

const NavbarContainer = styled.div`
  width: 100%;
  height: 4rem;
  background-color: #1c5476;
  color: #fff;
  display: flex;
  align-items: center;
  box-shadow: rgba(17, 17, 26, 0.1) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 8px 24px,
    rgba(17, 17, 26, 0.1) 0px 16px 48px;
`;

const SearchInput = styled.input`
  width: 15rem;
  background-color: #557f98;
  color: #fff;
  padding: 0.6rem 1rem;
  border-radius: 50px;
  border: none;

  ::placeholder,
  ::-webkit-input-placeholder {
    color: #fff;
  }
  :-ms-input-placeholder {
    color: #fff;
  }

  @media (max-width: 615px) {
    width: 8rem;
  }

  @media (max-width: 500px) {
    display: none;
  }
`;

const buttonStyles = {
  signIn: {
    color: '#fff',
  },
  userIcon: {
    fontSize: '2.5rem',
  },
  homeIcon: {
    fontSize: '2rem',
    margin: '0 2.5rem 0 1.8rem',
    cursor: 'pointer',
  },
  switchMode: {
    marginLeft: 'auto',
  },
};

const NavBar = ({ searchTerm, setSearchTerm }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mode, setMode] = useState(false);
  const history = useHistory();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangeMode = () => {
    setMode(!mode);
  };

  return (
    <NavbarContainer>
      <HomeIcon
        style={buttonStyles.homeIcon}
        onClick={() =>
          history.push({
            pathname: '/',
          })
        }
      />
      <SearchInput
        placeholder="Search..."
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <FormControlLabel
        style={{ marginLeft: 'auto' }}
        control={
          <Switch
            checked={mode}
            onChange={handleChangeMode}
            color="primary"
            name="mode"
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
        }
        label="Dark mode"
      />

      <Button
        style={buttonStyles.signIn}
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <AccountCircleIcon style={buttonStyles.userIcon} />
      </Button>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Sign in</MenuItem>
      </Menu>
    </NavbarContainer>
  );
};

export default NavBar;
