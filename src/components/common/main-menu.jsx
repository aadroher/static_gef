import React from 'react';
import styled from 'styled-components';
import { graphql, useStaticQuery } from 'gatsby';

import MainMenuLink from './main-menu-link';
import { load } from 'cheerio';

const staticQuery = graphql`
  query MenuItems {
    indexPages: allSitePage(filter: { context: { isIndex: { eq: true } } }) {
      nodes {
        path
        context {
          id
          isIndex
          languageCode
          collectionIds
        }
      }
    }
  }
`;

const MenuList = styled.ul`
  margin: 0;
  padding: 0;

  display: flex;

  & li {
    list-style-position: outside;
    list-style-type: none;
    padding: 1rem 0;

    &.active {
      background-color: white;
      text-align: center;
      width: 5rem;
    }
  }

  & > li + li {
    margin-left: 1rem;
  }
`;

const getPath = ({ locale, contentType }) => `/${locale}/${contentType}`;
const getEnabled = ({ currentPath, path }) => currentPath !== path;

const MenuItem = ({ locale, contentType, label, currentPath }) => {
  const path = getPath({ locale, contentType });
  const enabled = getEnabled({ currentPath, path });
  return (
    <li>
      <MainMenuLink path={path} enabled={enabled}>
        {label}
      </MainMenuLink>
    </li>
  );
};

const MainMenu = ({ locale }) => {
  const data = useStaticQuery(staticQuery);
  console.log(data);

  return (
    <nav>
      <MenuList>
        <MenuItem locale={locale} contentType="activities" label="Activitats" />
        <MenuItem locale={locale} contentType="activities" label="Vocabulari" />
      </MenuList>
    </nav>
  );
};

export default MainMenu;
