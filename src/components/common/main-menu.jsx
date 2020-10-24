import React, { useContext } from 'react';
import styled from 'styled-components';
import { graphql, useStaticQuery } from 'gatsby';

import MainMenuLink from './main-menu-link';
import GlobalContext from './global-context';

const staticQuery = graphql`
  query MainMenu {
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
    markdownContent: allMarkdownRemark {
      nodes {
        id
        frontmatter {
          contentType
          title
          languageCode
        }
        parent {
          ... on File {
            relativePath
          }
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

const getEnabled = ({ currentPath, path }) => currentPath !== path;
const getLocale = path => {
  const [, localeUrlPathComponent] = path.split('/');
  return localeUrlPathComponent;
};

const getMenuItemData = ({ locale, indexPages, markdownContent }) =>
  indexPages.nodes
    .filter(({ path }) => locale === getLocale(path))
    .map(({ path, context: { markdownNodeId } }) => {
      const {
        frontmatter: { title: label }
      } = markdownContent.nodes.find(({ id }) => id === markdownNodeId);

      return {
        path,
        label
      };
    });

const MainMenu = () => {
  const {
    location: { pathname: currentPath }
  } = useContext(GlobalContext);
  const staticQueryData = useStaticQuery(staticQuery);
  const locale = getLocale(currentPath);
  const menuItemData = getMenuItemData({ locale, ...staticQueryData });

  return (
    <nav>
      <MenuList>
        {menuItemData.map(({ path, label }) => (
          <li key={path}>
            <MainMenuLink
              path={path}
              enabled={getEnabled({ currentPath, path })}
              label={label}
            />
          </li>
        ))}
      </MenuList>
    </nav>
  );
};

export default MainMenu;
