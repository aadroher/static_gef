import React from 'react';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';
import styledNormalize from 'styled-normalize';

const GlobalStyles = createGlobalStyle`
  ${styledNormalize}
  body {
    margin: 0;
    padding: 0;
  }
`;

const MainMenuStyles = styled.nav`
  background-color: white;

  & > ul {
    margin: 0;

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
  <MainMenuStyles className="main-menu">
    <ul>
      <li className="active">Activitats</li>
    </ul>
  </MainMenuStyles>
);

const HeadingStyles = styled.div`
  background-color: gray;
  color: white;
  font-size: 0.5rem;
  margin-top: 0;
  padding: 1rem;
  width: 100%;
`;

const SiteTitle = styled.h1`
  margin: 0%;
`;

const Heading = () => (
  <HeadingStyles className="header__heading">
    <SiteTitle className="header__site-title">
      Grup d'Estudis Fenomenològics
    </SiteTitle>
  </HeadingStyles>
);

const HeaderStyles = styled.header``;

const Header = data => (
  <HeaderStyles className="header">
    <Heading />
    <MainMenu {...data} />
  </HeaderStyles>
);

const MainLayoutStyles = styled.div`
  width: 100%;
  padding-top: 0;
`;

const ContentOuterStyles = styled.div`
  margin-top: 5rem;
`;

const MainLayout = ({ children }) => (
  <>
    <GlobalStyles />
    <MainLayoutStyles className="main-container">
      <Header />
      <ContentOuterStyles>{children}</ContentOuterStyles>
    </MainLayoutStyles>
  </>
);

export default MainLayout;
