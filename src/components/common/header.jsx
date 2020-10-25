import React from 'react';
import styled from 'styled-components';
import MainMenu from './main-menu';

const Heading = styled.div`
  background-color: dimgray;
  color: white;
  width: 100%;
`;

const SiteTitle = styled.h1``;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  max-width: 60rem;
`;

const StyledMainMenu = styled(MainMenu)``;

const Header = () => (
  <Heading>
    <ContentWrapper>
      <SiteTitle>Grup d&apos;Estudis Fenomenològics</SiteTitle>
      <StyledMainMenu />
    </ContentWrapper>
  </Heading>
);

export default Header;
