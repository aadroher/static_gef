import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

const EnabledLink = styled(Link)``;
const DisabledLink = styled.span``;

const MainMenuLink = ({ label, path, enabled }) => {
  const linkProps = enabled ? { to: path } : {};
  return enabled ? (
    <EnabledLink {...linkProps}>{label}</EnabledLink>
  ) : (
    <DisabledLink {...linkProps}>{label}</DisabledLink>
  );
};

export default MainMenuLink;
