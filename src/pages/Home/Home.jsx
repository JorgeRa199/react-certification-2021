import React, { useState, useEffect, useContext } from 'react';

import styled from 'styled-components';

import VideosContext from '../../Context/VideosContext';

import HomeVideos from '../../components/Home/HomeVideos.component';

const { REACT_APP_API_KEY } = process.env;

function HomePage() {
  const [videos, setVideos] = useState(null);
  const { state } = useContext(VideosContext);
  const { searchTerm, darkMode } = state;

  const API_URL = `https://www.googleapis.com/youtube/v3/search?key=${REACT_APP_API_KEY}&q=${searchTerm}&part=snippet,id&order=date&type=video&maxResults=20`;

  async function searchVideos() {
    try {
      const response = await fetch(API_URL);
      const videosRes = await response.json();

      setVideos(videosRes);
    } catch (error) {
      console.error('Something went wrong: ', error);
    }
  }

  useEffect(() => {
    console.log(searchTerm);
    searchVideos();
  }, [searchTerm]);

  const HomeContainer = styled.section`
    margin-top: -4.3rem;
  `;

  return (
    <HomeContainer style={{ backgroundColor: darkMode ? '#303030' : '#fafafa' }}>
      <HomeVideos videos={videos ?? videos} />
    </HomeContainer>
  );
}

export default HomePage;
