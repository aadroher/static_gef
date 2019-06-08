import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';

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
  <div className="activities-page">
    <h1>Activitats</h1>
    <div>
      {edges.map(edge => (
        <Activity {...edge} />
      ))}
    </div>
  </div>
);

const MainContainer = styled.div`
  background-color: transparent;
`;

const MainLayout = ({ children }) => (
  <MainContainer className="main-container">{children}</MainContainer>
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
