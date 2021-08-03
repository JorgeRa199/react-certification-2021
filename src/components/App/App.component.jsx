import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import AuthProvider from '../../providers/Auth';
import HomePage from '../../pages/Home';
import NavBar from '../Home/Navbar.component';
import VideoDetail from '../../pages/VideoDetail.page';

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <BrowserRouter>
      <AuthProvider>
        <NavBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <Switch>
          <Route exact path="/">
            <HomePage searchTerm={searchTerm} />
          </Route>
          <Route path="/video-detail/:id">
            <VideoDetail />
          </Route>
        </Switch>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
