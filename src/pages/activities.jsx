import React from 'react';
import { graphql } from 'gatsby';

const Activities = ({ data }) => (
  <div className="page-container">
    <h1>Activitats</h1>
    <p>{data.site.siteMetadata.description}</p>
  </div>
);

export const query = graphql`
  query ActivitiesQuery {
    site {
      siteMetadata {
        description
      }
    }
  }
`;

export default Activities;
