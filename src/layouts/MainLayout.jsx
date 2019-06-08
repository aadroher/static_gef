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

const HeaderStyles = styled.header``;

const Header = data => (
  <HeaderStyles className="header">
    <div className="header__site-title">
      <h1 className="header__site-title__heading">
        Grup d'Estudis Fenomenològics
      </h1>
      <MainMenu {...data} />
    </div>
  </HeaderStyles>
);

const MainLayoutStyles = styled.div``;

const MainLayout = ({ children }) => (
  <MainLayoutStyles className="main-container">
    <Header />
    {children}
  </MainLayoutStyles>
);

export default MainLayout;
