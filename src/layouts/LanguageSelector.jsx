import React, { useState } from 'react';
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

const StyledLanguageSelector = styled.div`
  display: inline;
  font-size: 1rem;
  ul {
    display: inline-block;
    list-style-type: none;
    li {
      display: inline;
      margin-left: 8px;

      a {
        color: white;
      }
    }
  }
`;

const LanguageSelector = () => {
  const [{ code: selectedCode }, setSelected] = useState({ code: 'ca' });
  console.log({ selectedCode });
  return (
    <StyledLanguageSelector>
      <ul>
        {languages.map(({ name, code }) => (
          <li key={code}>
            <a
              href="#"
              onClick={() => {
                setSelected({ code });
              }}
            >
              {name}
            </a>
          </li>
        ))}
      </ul>
    </StyledLanguageSelector>
  );
};
export default LanguageSelector;
