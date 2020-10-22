import React from 'react';
import { graphql } from 'gatsby';

import Activity from '../components/Activity';
import MainLayout from '../layouts/main-layout';

export const query = graphql`
  query Activities($id: String, $collectionIds: [String]) {
    meta: markdownRemark(id: { eq: $id }) {
      frontmatter {
        contentType
        languageCode
        title
      }
      html
      rawMarkdownBody
    }
    activities: allMarkdownRemark(
      filter: { id: { in: $collectionIds } }
      sort: { fields: [frontmatter___createdAt], order: DESC }
    ) {
      totalCount
      records: nodes {
        frontmatter {
          contentType
          createdAt
          title
        }
        html
        rawMarkdownBody
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
