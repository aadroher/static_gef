import React from 'react';
import styled from 'styled-components';

const EnabledLink = styled.a``;
const DisabledLink = styled.span``;

const MainMenuLink = ({ label, path, enabled }) => {
  const linkProps = enabled ? { path } : {};
  return enabled ? (
    <EnabledLink {...linkProps}>{label}</EnabledLink>
  ) : (
    <DisabledLink {...linkProps}>{label}</DisabledLink>
  );
};

export default MainMenuLink;
