import React, { useState, useContext } from 'react';
import styled from 'styled-components';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { HomeSharp, Favorite, CheckCircle } from '@material-ui/icons';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useHistory } from 'react-router';

import VideosContext from '../../Context/VideosContext';

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

const ErrorParagraph = styled.p`
  color: #ff0000;
  align-text: center;
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
    margin: '0 2rem 0 1.8rem',
    cursor: 'pointer',
  },
  switchMode: {
    marginLeft: 'auto',
  },
};

const NavBar = () => {
  const initialFormDataState = {
    user: '',
    password: '',
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState(initialFormDataState);
  const [error, setError] = useState({ error: false, message: '' });
  const { state, dispatch } = useContext(VideosContext);
  const { searchTerm, darkMode, logedIn } = state;
  const history = useHistory();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleOpenLogIn = () => {
    setAnchorEl(null);
    setModalOpen(true);
  };

  const onChange = (e) => {
    const { value, name } = e.currentTarget;
    setFormData({ ...formData, [name]: value });
  };

  const onLogin = () => {
    if (formData.user === 'wizeline' && formData.password === 'Rocks!') {
      dispatch({ type: 'SET_LOGED', payload: true });
      setFormData(initialFormDataState);
      setError({ error: false, message: '' });
      setModalOpen(false);
    } else {
      setError({ error: true, message: 'Invalid username or password' });
    }
  };

  const onCancel = () => {
    setError({ error: false, message: '' });
    setFormData(initialFormDataState);
    setModalOpen(false);
  };

  const onLogOut = () => {
    dispatch({ type: 'SET_LOGED', payload: false });
  };

  const handleChangeMode = () => {
    dispatch({ type: 'SET_THEME', payload: !darkMode });
  };

  const handleSetSearchTerm = (event) => {
    dispatch({ type: 'SET_SEARCH', payload: event.target.value });
  };

  return (
    <NavbarContainer style={{ backgroundColor: darkMode ? '#556CD6' : '#1c5476' }}>
      <HomeSharp
        style={buttonStyles.homeIcon}
        onClick={() =>
          history.push({
            pathname: '/',
          })
        }
      />

      <Favorite
        style={{
          fontSize: '1.7rem',
          marginRight: '1.8rem',
          cursor: 'pointer',
          display: logedIn ? 'block' : 'none',
        }}
        onClick={() =>
          history.push({
            pathname: '/favorites',
          })
        }
      />

      <SearchInput
        style={{ backgroundColor: darkMode ? '#8091E0' : '#557f98' }}
        placeholder="Search..."
        type="text"
        value={searchTerm}
        onChange={(e) => handleSetSearchTerm(e)}
      />
      <FormControlLabel
        style={{ marginLeft: 'auto' }}
        control={
          <Switch
            checked={darkMode}
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
        {!logedIn ? (
          <AccountCircleIcon style={buttonStyles.userIcon} />
        ) : (
          <CheckCircle style={buttonStyles.userIcon} />
        )}
      </Button>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleOpenLogIn}
      >
        {!logedIn ? (
          <MenuItem onClick={handleOpenLogIn}>Log in</MenuItem>
        ) : (
          <MenuItem onClick={() => onLogOut()}>Log out</MenuItem>
        )}
      </Menu>

      <Dialog
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Login</DialogTitle>
        <DialogContent>
          <ErrorParagraph>{error.message}</ErrorParagraph>
          <TextField
            margin="dense"
            label="Username"
            type="text"
            name="user"
            value={formData.user}
            onChange={onChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={onChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => onCancel()} color="primary">
            Cancel
          </Button>
          <Button onClick={() => onLogin()} color="primary">
            Login
          </Button>
        </DialogActions>
      </Dialog>
    </NavbarContainer>
  );
};

export default NavBar;
