import React from 'react';
import styled from 'styled-components';

const Heading = styled.div`
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

const Header = () => (
  <>
    <Heading>
      <SiteTitle className="header__site-title">
        Grup d&apos;Estudis Fenomenològics
      </SiteTitle>
    </Heading>
  </>
);

export default Header;
