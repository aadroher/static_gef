import React from 'react';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';
import styledNormalize from 'styled-normalize';

import Header from './header';
import MainMenu from '../components/common/main-menu';
import GlobalContext from '../components/common/global-context';

const GlobalStyles = createGlobalStyle`
  ${styledNormalize}
  body {
    margin: 0;
    padding: 0;

    a {
      color: mediumvioletred;
    }

    font-family: system-ui;
    color: black;
    width: 100%;
  } 
`;

const ContentWrapper = styled.div`
  margin: auto;
  max-width: 60rem;
  padding: 1rem;
`;

const MainLayout = ({ location, children }) => (
  <GlobalContext.Provider value={{ location }}>
    <GlobalStyles />
    <Header />
    <ContentWrapper>
      <MainMenu />
      {children}
    </ContentWrapper>
  </GlobalContext.Provider>
);

export default MainLayout;
