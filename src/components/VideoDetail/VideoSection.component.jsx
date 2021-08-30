import React, { useContext } from 'react';
import styled from 'styled-components';
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

const VideoSection = ({ video }) => {
  const { state } = useContext(VideosContext);
  const { darkMode } = state;

  return (
    <div style={{ color: darkMode ? '#fff' : '#000' }}>
      <Video
        src={`https://www.youtube.com/embed/${video.id.videoId}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
      <VideoTitle>{video.snippet.title}</VideoTitle>
      <VideoDescription>{video.snippet.description}</VideoDescription>
    </div>
  );
};

export default VideoSection;
