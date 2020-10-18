import React from 'react';
import styled from 'styled-components';

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

export default MainMenu;
