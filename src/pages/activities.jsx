import React from 'react';
import { graphql } from 'gatsby';

import Activity from '../components/Activity';
import MainLayout from '../layouts/MainLayout';

const Activities = ({
  data: {
    allFile: { edges },
  },
}) => (
  <div className="activities-page">
    <h1>Activitats</h1>
    <div>
      {edges.map(edge => (
        <Activity {...edge} />
      ))}
    </div>
  </div>
);

const ActivitiesPage = props => (
  <MainLayout>
    <Activities {...props} />
  </MainLayout>
);

export const query = graphql`
  query ActivitiesQuery {
    allFile(filter: { extension: { eq: "md" } }) {
      edges {
        node {
          id
          childMarkdownRemark {
            frontmatter {
              title
            }
            html
          }
        }
      }
    }
  }
`;

export default ActivitiesPage;
