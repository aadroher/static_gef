import React, { useContext } from 'react';
import styled from 'styled-components';

import MainMenuLink from './main-menu-link';
import GlobalContext from './global-context';
import mainMenuData from '../../../data/menus/main.yml';

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

const getMenuItemData = ({ locale, mainMenuData }) => mainMenuData[locale];

const MainMenu = () => {
  const {
    location: { pathname: currentPath }
  } = useContext(GlobalContext);
  const locale = getLocale(currentPath);
  const menuItemData = getMenuItemData({ locale, mainMenuData });

  return (
    <nav>
      <MenuList>
        {menuItemData.map(({ path, name }) => (
          <li key={path}>
            <MainMenuLink
              path={path}
              enabled={getEnabled({ currentPath, path })}
              label={name}
            />
          </li>
        ))}
      </MenuList>
    </nav>
  );
};

export default MainMenu;
