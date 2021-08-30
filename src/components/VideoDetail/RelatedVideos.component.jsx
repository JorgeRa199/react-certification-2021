import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import VideosContext from '../../Context/VideosContext';

const ListVideoContainer = styled.div`
  width: 95%;
  heigth: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const VideoImageThumbnail = styled.img`
  width: 100%;
  height: 12rem;
  object-fit: cover;
  margin: 1rem auto;

  @media (max-width: 950px) {
    width: 60%;
  }
`;

const VideoTitleThumbnail = styled.h1`
  text-align: center;
  font-size: 1.3rem;
  padding-bottom: 1rem;
`;

const RelatedVideoContainer = styled.div`
  width: 100%;
  margin-top: 1.5rem;
  border-bottom: 0.3rem solid #000;
  cursor: pointer;
  transition: transform 0.2s;
  display: flex;
  flex-direction: column;
  justify-content: center;

  &:hover {
    transform: scale(1.1);
  }
`;

const RelatedVideos = ({ videos }) => {
  const history = useHistory();
  const { state } = useContext(VideosContext);
  const { darkMode } = state;
  return (
    <ListVideoContainer style={{ color: darkMode ? '#fff' : '#000' }}>
      {videos ? (
        videos.items.map((video) => {
          return (
            <RelatedVideoContainer
              key={video.id.videoId}
              onClick={() =>
                history.push({
                  pathname: `/video-detail/${video.id.videoId}`,
                  state: { props: video },
                })
              }
            >
              <VideoImageThumbnail src={video.snippet.thumbnails.medium.url} />
              <VideoTitleThumbnail>{video.snippet.title}</VideoTitleThumbnail>
            </RelatedVideoContainer>
          );
        })
      ) : (
        <VideoTitleThumbnail>Loading...</VideoTitleThumbnail>
      )}
    </ListVideoContainer>
  );
};

export default RelatedVideos;
