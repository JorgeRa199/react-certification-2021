import React from 'react';
import { render } from '@testing-library/react';
import { videos } from '../../mocks/videos-mock';

import VideoSection from '../../components/VideoDetail/VideoSection.component';

describe('<VideoSection> rendering', () => {
  const { container } = render(<VideoSection video={videos.items[0]} />);
  const videoSection = container.querySelector('div > div');
  const youtubeVideo = videoSection.querySelector('iframe');

  test('should render VideoSection elements correctly', () => {
    expect(youtubeVideo).toBeTruthy();
    expect(videoSection.querySelector('h1')).toBeTruthy();
    expect(videoSection.querySelector('p')).toBeTruthy();
  });

  test('should render VideoSection content correctly', () => {
    expect(youtubeVideo.src).toEqual('https://www.youtube.com/embed/nmXMgqjQzls');
    expect(videoSection.querySelector('h1')).toHaveTextContent(
      'Video Tour | Welcome to Wizeline Guadalajara'
    );
    expect(videoSection.querySelector('p')).toHaveTextContent(
      'Follow Hector Padilla, Wizeline Director of Engineering, for a lively tour of our office. In 2018, Wizeline opened its stunning new office in Guadalajara, Jalisco, ...'
    );
  });
});
