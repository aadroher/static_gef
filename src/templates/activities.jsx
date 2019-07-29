import React from 'react';
import { graphql } from 'gatsby';
import { md5 } from 'pure-md5';

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
      <a name="top"></a>
      {edges.map(
        ({
          node: {
            childMarkdownRemark: {
              frontmatter: { title },
              html,
            },
          },
        }) => {
          const key = md5(title + html);
          return <Activity key={key} title={title} html={html} />;
        }
      )}
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
