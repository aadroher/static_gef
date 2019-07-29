import React from 'react';
import styled from 'styled-components';

const languages = [
  {
    name: 'Català',
    code: 'ca',
  },
  {
    name: 'Castellano',
    code: 'es',
  },
  {
    name: 'English',
    code: 'en',
  },
];

const StyledLanguageSelector = styled.div``;

const LanguageSelector = () => (
  <StyledLanguageSelector>
    <ul>
      {languages.map(({ name }) => (
        <li>{name}</li>
      ))}
    </ul>
  </StyledLanguageSelector>
);

export default LanguageSelector;
