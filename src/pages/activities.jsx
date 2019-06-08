import React from 'react';
import { graphql } from 'gatsby';

const Activity = ({
  node: {
    childMarkdownRemark: {
      frontmatter: { title },
    },
  },
}) => (
  <div>
    <h3>{title}</h3>
  </div>
);

const Activities = ({
  data: {
    allFile: { edges },
  },
}) => (
  <div className="page-container">
    <h1>Activitats</h1>
    <div>
      {edges.map(edge => (
        <Activity {...edge} />
      ))}
    </div>
  </div>
);

const MainLayout = ({ children }) => <div className="main-layout"></div>;

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

export default Activities;
