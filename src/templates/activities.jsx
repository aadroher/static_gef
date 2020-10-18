import React from 'react';
import { graphql } from 'gatsby';
import { md5 } from 'pure-md5';

import Activity from '../components/Activity';
import MainLayout from '../layouts/MainLayout';

export const query = graphql`
  query Activities($id: String, $collectionIds: [String]) {
    pageMarkdown: markdownRemark(id: { eq: $id }) {
      frontmatter {
        contentType
        createdAt
        languageCode
        title
      }
      html
      rawMarkdownBody
    }
    collectionMarkdown: allMarkdownRemark(
      filter: { id: { in: $collectionIds } }
    ) {
      nodes {
        frontmatter {
          contentType
          createdAt
          languageCode
          title
        }
        html
        rawMarkdownBody
      }
    }
  }
`;

const Activities = ({ data }) => (
  <div className="activities-page">
    <h1>Activitats</h1>
    <pre>{JSON.stringify(data, null, 2)}</pre>
    {/* <div>
        <a name="top"></a>
        {edges.map(
          ({
            node: {
              childMarkdownRemark: {
                frontmatter: { title },
                html
              }
            }
          }) => {
            const key = md5(title + html);
            return <Activity key={key} title={title} html={html} />;
          }
        )}
      </div> */}
  </div>
);

const ActivitiesPage = props => (
  <MainLayout>
    <Activities {...props} />
  </MainLayout>
);

export default ActivitiesPage;
