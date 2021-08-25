import React, { useEffect, useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import VideosContext from '../Context/VideosContext';
import VideoSection from '../components/VideoDetail/VideoSection.component';
import RelatedVideos from '../components/VideoDetail/RelatedVideos.component';

const { REACT_APP_API_KEY } = process.env;

const VideoDetailContainer = styled.section`
  display: grid;
  grid-template-columns: auto 24rem;

  @media (max-width: 950px) {
    grid-template-columns: 100%;
  }
`;

const VideoDetail = () => {
  const location = useLocation();
  const { id, snippet } = location.state.props;
  const selectedVideo = { id, snippet };
  const { state } = useContext(VideosContext);
  const { darkMode } = state;
  const [relatedVideos, setRelatedVideos] = useState(null);

  const API_URL = `https://www.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=${id.videoId}&type=video&key=${REACT_APP_API_KEY}`;

  async function getRelatedVideos() {
    try {
      const response = await fetch(API_URL);
      const videosRes = await response.json();
      console.log(videosRes);

      setRelatedVideos(videosRes.items);
    } catch (error) {
      console.error('Something went wrong: ', error);
    }
  }

  useEffect(() => {
    getRelatedVideos();
  }, [id.videoId]);

  return (
    <VideoDetailContainer style={{ backgroundColor: darkMode ? '#303030' : '#fafafa' }}>
      <VideoSection video={selectedVideo} />
      <RelatedVideos videos={relatedVideos} isFav={false} />
    </VideoDetailContainer>
  );
};

export default VideoDetail;
