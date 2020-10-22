import React from 'react';
import { graphql } from 'gatsby';

import Activity from '../components/Activity';
import MainLayout from '../layouts/main-layout';

export const query = graphql`
  query Activities(
    $markdownNodeId: String
    $collectionmarkdownNodeIds: [String]
  ) {
    meta: markdownRemark(id: { eq: $markdownNodeId }) {
      frontmatter {
        contentType
        languageCode
        title
      }
      html
      rawMarkdownBody
    }
    activityPages: allSitePage(
      filter: {
        context: { markdownNodeId: { in: $collectionmarkdownNodeIds } }
      }
    ) {
      nodes {
        path
        context {
          markdownNodeId
        }
      }
    }
    activities: allMarkdownRemark(
      filter: { id: { in: $collectionmarkdownNodeIds } }
      sort: { fields: [frontmatter___createdAt], order: DESC }
    ) {
      totalCount
      nodes {
        frontmatter {
          contentType
          createdAt
          title
        }
        html
        rawMarkdownBody
        internal {
          content
          description
          ignoreType
          mediaType
        }
        children {
          id
        }
      }
    }
  }
`;

const Activities = props => (
  <div className="activities-page">
    <h1>Activitats</h1>
    <pre>{JSON.stringify(props.pageContext, null, 2)}</pre>
    <pre>{JSON.stringify(props.data, null, 2)}</pre>
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
