import React, { useContext } from 'react';
import styled from 'styled-components';

import MainMenuLink from './main-menu-link';
import GlobalContext from './global-context';
import mainMenuData from '../../../data/menus/main.yml';

const MenuList = styled.ul`
  /* margin: 0;
  padding: 0; */

  display: flex;
  list-style-type: none;
  padding-left: 0;
  margin-top: 0;
  margin-bottom: 0;

  & li {
    display: flex;
    list-style-position: outside;
    list-style-type: none;
  }

  & > li + li {
    margin-left: 0.3rem;
  }
`;

const getEnabled = ({ currentPath, path }) => currentPath !== path;
const getLocale = path => {
  const [, localeUrlPathComponent] = path.split('/');
  return localeUrlPathComponent;
};

const getMenuItemData = ({ locale, mainMenuData }) => mainMenuData[locale];

const MainMenu = ({ className }) => {
  const {
    location: { pathname: currentPath }
  } = useContext(GlobalContext);
  const locale = getLocale(currentPath);
  const menuItemData = getMenuItemData({ locale, mainMenuData });

  return (
    <nav className={className}>
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
