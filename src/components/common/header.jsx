import React from 'react';
import styled from 'styled-components';
import MainMenu from './main-menu';

const Heading = styled.div`
  background-color: dimgray;
  color: white;
  width: 100%;
`;

const SiteTitle = styled.h1`
  margin: 0;
  font-size: 1.2rem;
`;

const ContentWrapper = styled.div`
  margin: auto;
  max-width: 60rem;
  nav {
    margin-top: 1rem;
  }
`;

const Header = () => (
  <Heading>
    <ContentWrapper>
      <SiteTitle>Grup d&apos;Estudis Fenomenològics</SiteTitle>
      <MainMenu />
    </ContentWrapper>
  </Heading>
);

export default Header;
