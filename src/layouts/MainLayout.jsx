import React from 'react';
import styled from 'styled-components';

const MainMenuStyles = styled.nav``;

const MainMenu = data => (
  <MainMenuStyles className="main-menu">
    <ul>
      <li>Activitats</li>
    </ul>
  </MainMenuStyles>
);

const HeadingStyles = styled.div`
  font-size: 0.5rem;
  margin-top: 0;
  color: white;
  background-color: gray;
  width: 100%;
`;

const Heading = () => (
  <HeadingStyles>
    <div className="header__site-title">
      <h1 className="header__site-title__heading">
        Grup d'Estudis Fenomenològics
      </h1>
    </div>
  </HeadingStyles>
);

const HeaderStyles = styled.header`
  position: fixed;
  top: 0;
`;

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
  <MainLayoutStyles className="main-container">
    <Header />
    <ContentOuterStyles>{children}</ContentOuterStyles>
  </MainLayoutStyles>
);

export default MainLayout;
