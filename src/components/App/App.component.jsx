import React, { useReducer } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import VideosContext from '../../Context/VideosContext';

import HomePage from '../../pages/Home';
import FavoriteVideos from '../../pages/FavoriteVideos.page';
import NavBar from '../Home/Navbar.component';
import VideoDetail from '../../pages/VideoDetail.page';
import FavoriteVideoDetail from '../../pages/FavoriteVideoDetail.page';

const initialState = {
  searchTerm: 'wizeline',
  darkMode: false,
  logedIn: false,
  history: [],
};

function reducer(state, action) {
  const history = [`${action.type}: ${JSON.stringify(action.payload)}`, ...state.history];
  switch (action.type) {
    case 'SET_THEME':
      return {
        ...state,
        darkMode: action.payload,
        history,
      };
    case 'SET_LOGED':
      return {
        ...state,
        logedIn: action.payload,
        history,
      };
    case 'SET_SEARCH':
      return {
        ...state,
        searchTerm: action.payload,
        history,
      };
    default:
      throw new Error('Unkown action');
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <VideosContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/video-detail/:id">
            <VideoDetail />
          </Route>
          <Route path="/favorites">
            <FavoriteVideos />
          </Route>
          <Route path="/favorites-detail/:id">
            <FavoriteVideoDetail />
          </Route>
        </Switch>
      </BrowserRouter>
    </VideosContext.Provider>
  );
}

export default App;
