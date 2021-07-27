import React from 'react';
import { render } from '@testing-library/react';
import 'jest-styled-components';

import HomeVideos, { VideoCard } from '../../components/Home/HomeVideos.component';

describe('<NavBar /> rendering', () => {
  const { container } = render(<HomeVideos />);
  const homeVideos = container.querySelector('div');

  test('should render HomeVideos with styles correctly', () => {
    expect(homeVideos).toHaveStyle('display: flex');
    expect(homeVideos).toHaveStyle('flex-wrap: wrap');
    expect(homeVideos).toHaveStyle('justify-content: center;');
    expect(homeVideos).toHaveStyle('width: 90%;');
  });

  test('should render all video cards', () => {
    expect(homeVideos.children).toHaveLength(25);
  });

  test('should VideoCards correctly', () => {
    const videoMock = {
      title: 'title',
      description: 'description',
      thumbnails: {
        medium: {
          url: 'https://yt3.ggpht.com/ytc/AAUvwnighSReQlmHl_S_vSfvnWBAG5Cw4A0YxtE0tm5OpQ=s240-c-k-c0xffffffff-no-rj-mo',
        },
      },
    };

    // eslint-disable-next-line no-shadow
    const { container } = render(<VideoCard props={videoMock} />);
    const videoCard = container.querySelector('div > div');
    const videoTitle = videoCard.querySelector('h1');
    const videoDescription = videoCard.querySelector('p');
    const videoImage = videoCard.querySelector('img');

    // most important styles
    expect(videoCard).toHaveStyle('width: 20rem');
    expect(videoCard).toHaveStyle('color: #000;');
    expect(videoCard).toHaveStyle('background-color: #fff');
    expect(videoCard).toHaveStyle('margin: 2rem;');
    expect(videoCard).toHaveStyle('cursor: pointer');
    expect(videoCard).toHaveStyle('display: flex');
    expect(videoCard).toHaveStyle('flex-direction: column');

    // render content
    expect(videoTitle).toBeTruthy();
    expect(videoDescription).toBeTruthy();
    expect(videoImage).toBeTruthy();
    expect(videoImage.src).toBeTruthy();
  });
});
