import React from 'react';
import { graphql } from 'gatsby';

const Activities = ({ data }) => (
  <div className="page-container">
    <h1>Activitats</h1>
    <p>{JSON.stringify(data, null, 2)}</p>
  </div>
);

export const query = graphql`
  query ActivitiesQuery {
    allFile(filter: { extension: { eq: "md" } }) {
      edges {
        node {
          id
          childMarkdownRemark {
            html
          }
        }
      }
    }
  }
`;

export default Activities;
