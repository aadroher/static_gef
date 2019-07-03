import React from 'react';
import styled from 'styled-components';

import MainMenu from './MainMenu';

const HeadingContainer = styled.div`
  background-color: dimgray;
  color: white;
  font-size: 0.5rem;
  margin-top: 0;
  padding: 1rem 0;
  width: 100%;
`;

const SiteTitle = styled.h1`
  margin: 0 1rem;
`;

const Heading = () => (
  <HeadingContainer className="header__heading">
    <SiteTitle className="header__site-title">
      Grup d'Estudis Fenomenològics
    </SiteTitle>
  </HeadingContainer>
);

const HeaderContainer = styled.header``;

const Header = data => (
  <HeaderContainer className="header">
    <Heading />
    <MainMenu {...data} />
  </HeaderContainer>
);

export default Header;
