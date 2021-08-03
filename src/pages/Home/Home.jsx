import React, { useState, useEffect } from 'react';

import styled from 'styled-components';

import HomeVideos from '../../components/Home/HomeVideos.component';

const { REACT_APP_API_KEY } = process.env;

function HomePage({ searchTerm }) {
  const [videos, setVideos] = useState(null);

  const API_URL = `https://www.googleapis.com/youtube/v3/search?key=${REACT_APP_API_KEY}&q=${searchTerm}&part=snippet,id&order=date&maxResults=20`;

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
    background-color: #fafafa;
  `;

  return (
    <HomeContainer>
      <HomeVideos videos={videos ?? videos} />
    </HomeContainer>
  );
}

export default HomePage;
