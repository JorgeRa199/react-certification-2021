import React from 'react';
import styled from 'styled-components';

import { videos } from '../../mocks/videos-mock';

const CardContainer = styled.div`
  width: 20rem;
  height: auto;
  background-color: #fff;
  color: #000;
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
  font-size: 0.85rem;
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

export const VideoCard = ({ props }) => {
  const { thumbnails, title, description } = props;

  return (
    <CardContainer>
      <VideoImage src={thumbnails.medium.url} />
      <TitleContainer>
        <h1>{title}</h1>
      </TitleContainer>
      <DescriptionContainer>
        <p>{description}</p>
      </DescriptionContainer>
    </CardContainer>
  );
};

const HomeVideos = () => {
  return (
    <VideosContainer>
      {videos.items.map((video) => {
        return <VideoCard props={video.snippet} key={video.snippet.publishedAt} />;
      })}
    </VideosContainer>
  );
};

export default HomeVideos;
