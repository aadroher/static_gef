import React from 'react';
import styled from 'styled-components';
import { graphql, useStaticQuery } from 'gatsby';

const staticQuery = graphql`
  query MenuItems {
    indexPages: allSitePage(filter: { context: { isIndex: { eq: true } } }) {
      nodes {
        path
        context {
          markdownNodeId
          isIndex
          languageCode
          collectionmarkdownNodeIds
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

const getUrl = ({ locale, contentType }) => `/${locale}/${contentType}`;

const MainMenu = ({ locale }) => {
  const data = useStaticQuery(staticQuery);
  console.log(data);

  return (
    <nav>
      <MenuList>
        <li>
          <a href={getUrl({ locale, contentType: 'activities' })}>Activitats</a>
        </li>
        <li>
          <a href={getUrl({ locale, contentType: 'terms' })}>Vocabulari</a>
        </li>
      </MenuList>
    </nav>
  );
};

export default MainMenu;
