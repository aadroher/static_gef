import React from 'react';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';
import styledNormalize from 'styled-normalize';

const GlobalStyles = createGlobalStyle`
  ${styledNormalize}
  body {
    margin: 0;
    padding: 0;

    a {
      color: mediumvioletred;
    }
  } 
`;

const MainMenuContainer = styled.nav`
  background-color: white;
  margin: auto;
  max-width: 800px;

  & > ul {
    margin: 0;
    padding: 0;

    & li {
      list-style-position: outside;
      list-style-type: none;
      padding: 1rem;

      &.active {
        background-color: white;
        text-align: center;
        width: 5rem;
      }
    }
  }
`;

const MainMenu = data => (
  <MainMenuContainer className="main-menu">
    <ul>
      <li className="active">Activitats</li>
    </ul>
  </MainMenuContainer>
);

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

const MainLayoutContainer = styled.div`
  color: black;
  padding-top: 0;
  width: 100%;
`;

const ContentContainer = styled.div`
  margin: auto;
  max-width: 800px;
  padding: 1rem;
`;

const MainLayout = ({ children }) => (
  <>
    <GlobalStyles />
    <MainLayoutContainer className="main-container">
      <Header />
      <ContentContainer>{children}</ContentContainer>
    </MainLayoutContainer>
  </>
);

export default MainLayout;
