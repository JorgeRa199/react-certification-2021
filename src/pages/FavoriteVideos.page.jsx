import React, { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import VideosContext from '../Context/VideosContext';
import HomeVideos from '../components/Home/HomeVideos.component';

const FavoriteVideos = () => {
  const [videos, setVideos] = useState([]);
  const { state } = useContext(VideosContext);
  const { darkMode, logedIn } = state;

  const getFavVideos = () => {
    let localStorageFavVideos = [];
    localStorageFavVideos = JSON.parse(localStorage.getItem('FAV_VIDEOS')) || [];
    if (localStorageFavVideos === []) {
      setVideos(null);
    } else {
      setVideos(localStorageFavVideos);
    }
  };

  useEffect(() => {
    getFavVideos();
  }, []);

  const FavVideosContainer = styled.section`
    margin-top: -4.5rem;
    min-height: 93.2vh;
  `;

  return logedIn ? (
    <FavVideosContainer style={{ backgroundColor: darkMode ? '#303030' : '#fafafa' }}>
      <HomeVideos videos={videos ?? videos} isFav />
    </FavVideosContainer>
  ) : (
    <Redirect to="/" />
  );
};

export default FavoriteVideos;
