import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router';
import styled from 'styled-components';

const { REACT_APP_API_KEY } = process.env;

const VideoDetailContainer = styled.section`
  background-color: #fafafa;
  display: grid;
  grid-template-columns: auto 24rem;

  @media (max-width: 950px) {
    grid-template-columns: 100%;
  }
`;

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

const VideoDetail = () => {
  const location = useLocation();
  const history = useHistory();
  const { id, snippet } = location.state.props;
  const [relatedVideos, setRelatedVideos] = useState(null);

  const API_URL = `https://www.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=${id.videoId}&type=video&key=${REACT_APP_API_KEY}`;

  async function getRelatedVideos() {
    try {
      const response = await fetch(API_URL);
      const videosRes = await response.json();
      console.log(videosRes);

      setRelatedVideos(videosRes);
    } catch (error) {
      console.error('Something went wrong: ', error);
    }
  }

  useEffect(() => {
    getRelatedVideos();
  }, [id.videoId]);

  return (
    <VideoDetailContainer>
      <div>
        <Video
          src={`https://www.youtube.com/embed/${id.videoId}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        <VideoTitle>{snippet.title}</VideoTitle>
        <VideoDescription>{snippet.description}</VideoDescription>
      </div>
      <ListVideoContainer>
        {relatedVideos ? (
          relatedVideos.items.map((video) => {
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
    </VideoDetailContainer>
  );
};

export default VideoDetail;
