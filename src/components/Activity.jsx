import React from 'react';
import styled from 'styled-components';

const ActivityContainer = styled.div`
  background-color: snow;
  .activity {
    &__title {
      background-color: whitesmoke;
      padding: 16px;
    }
    &__content {
      margin: 16px;
    }
  }
`;

const Activity = ({ title, html }) => (
  <ActivityContainer className="activity">
    <h3 className="activity__title">{title}</h3>
    <div
      className="activity__content"
      dangerouslySetInnerHTML={{ __html: html }}
    />
    <div className="activity__go-to-top">
      <a href="#top">⬆️</a>
    </div>
  </ActivityContainer>
);

export default Activity;
