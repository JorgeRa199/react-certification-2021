import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';

import VideosContext from '../../Context/VideosContext';

const CardContainer = styled.div`
  width: 20rem;
  height: auto;
  margin: 2rem;
  display: flex;
  flex-direction: column;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  border-radius: 2rem;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
  }
`;

const VideoImage = styled.img`
  width: 100%;
  height: 11.4rem;
  object-fit: cover;
`;

const TitleContainer = styled.div`
  height: 4rem;
  overflow: hidden;
  text-align: center;
  padding: 5%;
  font-size: 0.6rem;
`;

const DescriptionContainer = styled.div`
  height: 8.2rem;
  overflow: hidden;
  font-weight: lighter;
  font-size: 0.9rem;
  padding: 7% 5%;
`;

const VideosContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 90%;
  margin: 4.5rem auto;
`;

export const VideoCard = ({ props, isFav }) => {
  const { snippet, id } = props;
  const { state } = useContext(VideosContext);
  const { darkMode } = state;

  const history = useHistory();
  const onClickRoute = () => {
    let route = '';
    if (isFav) {
      route = `/favorites-detail/${id.videoId}`;
    } else {
      route = `/video-detail/${id.videoId}`;
    }
    return route;
  };

  return (
    <CardContainer
      style={{
        backgroundColor: darkMode ? '#515151' : '#fff',
        color: darkMode ? '#fff' : '#000',
      }}
      onClick={() =>
        history.push({
          pathname: onClickRoute(),
          state: { props },
        })
      }
    >
      <VideoImage src={snippet.thumbnails.medium.url} />
      <TitleContainer>
        <h1>{snippet.title}</h1>
      </TitleContainer>
      <DescriptionContainer>
        <p>{snippet.description}</p>
      </DescriptionContainer>
    </CardContainer>
  );
};

/* eslint no-nested-ternary: 0 */
const HomeVideos = ({ videos, isFav }) => {
  return (
    <VideosContainer>
      {videos ? (
        videos.error ? (
          <h1>{videos.error.message}</h1>
        ) : (
          videos.map((video) => {
            return (
              <VideoCard props={video} isFav={isFav} key={video.snippet.publishedAt} />
            );
          })
        )
      ) : (
        <h1>Loading ...</h1>
      )}
    </VideosContainer>
  );
};

export default HomeVideos;
