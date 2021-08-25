import React, { useEffect, useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import VideosContext from '../Context/VideosContext';
import VideoSection from '../components/VideoDetail/VideoSection.component';
import RelatedVideos from '../components/VideoDetail/RelatedVideos.component';

const FavVideoDetailContainer = styled.section`
  display: grid;
  grid-template-columns: auto 24rem;
  min-height: 93.2vh;

  @media (max-width: 950px) {
    grid-template-columns: 100%;
  }
`;

const FavoriteVideoDetail = () => {
  const location = useLocation();
  const { id, snippet } = location.state.props;
  const selectedVideo = { id, snippet };
  const { state } = useContext(VideosContext);
  const { darkMode } = state;
  const [favVideos, setFavVideos] = useState(null);

  function getFavVideos() {
    let localStorageFavVideos = [];
    localStorageFavVideos = JSON.parse(localStorage.getItem('FAV_VIDEOS')) || [];
    if (localStorageFavVideos === []) {
      setFavVideos(null);
    } else {
      setFavVideos(localStorageFavVideos);
    }
  }

  useEffect(() => {
    getFavVideos();
  }, [id.videoId]);

  return (
    <FavVideoDetailContainer
      style={{ backgroundColor: darkMode ? '#303030' : '#fafafa' }}
      key={id.videoId}
    >
      <VideoSection video={selectedVideo} />
      <RelatedVideos videos={favVideos} isFav />
    </FavVideoDetailContainer>
  );
};

export default FavoriteVideoDetail;
