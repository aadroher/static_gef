import React from 'react';
import styled from 'styled-components';
import {
  Grid,
  Normalize,
  ThemeProvider,
  theme,
  Row,
  Col,
} from '@smooth-ui/core-sc';

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
    <Grid className="header__site-title">
      <Row>
        <Col xs={10}>
          <h1 className="header__site-title__heading">
            Grup d'Estudis Fenomenològics
          </h1>
        </Col>
        <Col xs={2}></Col>
      </Row>
      <Row>
        <Col>
          <MainMenu {...data} />
        </Col>
      </Row>
    </Grid>
  </HeaderStyles>
);

const MainLayout = ({ children }) => (
  <>
    <Normalize />
    <ThemeProvider theme={theme}>
      <div className="main-container">
        <Header />
        <Grid>
          <Row>
            <Col>{children}</Col>
          </Row>
        </Grid>
      </div>
    </ThemeProvider>
  </>
);

export default MainLayout;
