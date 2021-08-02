import React, { useRef } from 'react';
import styled from 'styled-components';

import NavBar from '../../components/Home/Navbar.component';
import HomeVideos from '../../components/Home/HomeVideos.component';

function HomePage() {
  const sectionRef = useRef(null);

  const HomeContainer = styled.section`
    background-color: #fafafa;
  `;

  return (
    <HomeContainer ref={sectionRef}>
      <NavBar />
      <HomeVideos />
    </HomeContainer>
  );
}

export default HomePage;
