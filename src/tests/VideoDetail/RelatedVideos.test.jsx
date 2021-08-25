import React from 'react';
import { render } from '@testing-library/react';
import { videos } from '../../mocks/videos-mock';

import RelatedVideos from '../../components/VideoDetail/RelatedVideos.component';

describe('<RelatedVideos> rendering', () => {
  const { container } = render(<RelatedVideos videos={videos.items} />);
  const relatedVideos = container.querySelector('div > div');
  const cardVideo = relatedVideos.querySelector('div>div');

  test('should render RelatedVideos elements correctly', () => {
    expect(relatedVideos.children).toHaveLength(20);
    expect(cardVideo.querySelector('h1')).toBeTruthy();
    expect(cardVideo.querySelector('img')).toBeTruthy();
  });

  test('should render VideoSection content correctly', () => {
    expect(cardVideo.querySelector('img').src).toEqual(
      'https://i.ytimg.com/vi/nmXMgqjQzls/mqdefault.jpg'
    );
    expect(cardVideo.querySelector('h1')).toHaveTextContent(
      'Video Tour | Welcome to Wizeline Guadalajara'
    );
  });
});
