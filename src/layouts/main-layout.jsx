import React from 'react';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';
import styledNormalize from 'styled-normalize';

import Header from './header';

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
