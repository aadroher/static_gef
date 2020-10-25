import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'gatsby';

const commonStyles = css`
  padding: 0.5rem 1rem;
  background-color: silver;
  color: black;
  text-decoration: none;
`;

const highlighted = css`
  background-color: white;
  color: black;
`;

const EnabledLink = styled(Link)`
  ${commonStyles}
  &:hover {
    text-decoration: underline;
  }
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
