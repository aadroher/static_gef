import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'gatsby';

const commonStyles = css`
  padding: 0.3rem 0;
`;

const highlighted = css`
  border-bottom: solid;
`;

const EnabledLink = styled(Link)`
  ${commonStyles}
`;
const DisabledLink = styled.span`
  ${commonStyles}
  ${highlighted}
`;

const MainMenuLink = ({ label, path, enabled }) => {
  const linkProps = enabled ? { to: path } : {};
  return enabled ? (
    <EnabledLink {...linkProps}>{label}</EnabledLink>
  ) : (
    <DisabledLink {...linkProps}>{label}</DisabledLink>
  );
};

export default MainMenuLink;
