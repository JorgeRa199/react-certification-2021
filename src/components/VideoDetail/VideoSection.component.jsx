import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Favorite } from '@material-ui/icons';
import VideosContext from '../../Context/VideosContext';

const Video = styled.iframe`
  width: 100%;
  padding: 5%;
  height: 40rem;
  border: none;

  @media (max-width: 950px) {
    height: 25rem;
  }
`;

const VideoDescription = styled.p`
  text-align: left;
  font-size: 1.1rem;
  padding: 0 5%;
  max-height: 21rem;
  overflow: hidden;
`;

const VideoTitle = styled.h1`
  text-align: left;
  font-size: 1.5rem;
  padding: 1.3rem 5%;
`;

const AddFavoriteContainer = styled.div`
  font-size: 1.3rem;
  padding: 0 5%;
  display: flex;
  justify-content: flex-end;
  opacity: 0.8;
  cursor: pointer;
`;

const VideoSection = ({ video }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const { state } = useContext(VideosContext);
  const { darkMode, logedIn } = state;

  const verifyIfIsFavorite = () => {
    let localStorageFavVideos = [];
    localStorageFavVideos = JSON.parse(localStorage.getItem('FAV_VIDEOS')) || [];
    const indexVideoToRemove = localStorageFavVideos.findIndex(
      (videoLocalStorage) => videoLocalStorage.id.videoId === video.id.videoId
    );
    if (indexVideoToRemove > -1) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  };

  useEffect(() => {
    verifyIfIsFavorite();
  }, [video]);

  const addToFavorites = () => {
    let localStorageFavVideos = [];
    localStorageFavVideos = JSON.parse(localStorage.getItem('FAV_VIDEOS')) || [];
    localStorageFavVideos.push(video);
    localStorage.setItem('FAV_VIDEOS', JSON.stringify(localStorageFavVideos));
    console.log(localStorageFavVideos);

    setIsFavorite(true);
  };

  const removeFromFavorites = () => {
    let localStorageFavVideos = [];
    localStorageFavVideos = JSON.parse(localStorage.getItem('FAV_VIDEOS')) || [];
    const indexVideoToRemove = localStorageFavVideos.findIndex(
      (videoLocalStorage) => videoLocalStorage.id.videoId === video.id.videoId
    );
    if (indexVideoToRemove > -1) {
      localStorageFavVideos.splice(indexVideoToRemove, 1);
    }

    localStorage.setItem('FAV_VIDEOS', JSON.stringify(localStorageFavVideos));
    setIsFavorite(false);
  };

  return (
    <div style={{ color: darkMode ? '#fff' : '#000' }}>
      <Video
        src={`https://www.youtube.com/embed/${video.id.videoId}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
      <AddFavoriteContainer
        key={video.id.videoId}
        style={{ display: logedIn ? 'flex' : 'none' }}
        onClick={() => (!isFavorite ? addToFavorites() : removeFromFavorites())}
      >
        <Favorite style={{ marginRight: '1rem' }} />{' '}
        <p key={video.id.videoId}>
          {!isFavorite ? 'Add to favorites' : 'Remove from favorites'}
        </p>
      </AddFavoriteContainer>
      <VideoTitle>{video.snippet.title}</VideoTitle>
      <VideoDescription>{video.snippet.description}</VideoDescription>
    </div>
  );
};

export default VideoSection;
