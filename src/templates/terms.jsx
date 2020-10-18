import React from 'react';
import { graphql } from 'gatsby';

import MainLayout from '../layouts/MainLayout';

export const query = graphql`
  query Terms($id: String, $collectionIds: [String]) {
    pageMarkdown: markdownRemark(id: { eq: $id }) {
      frontmatter {
        contentType
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
          languageCode
          title
        }
        html
        rawMarkdownBody
      }
    }
  }
`;

const Terms = ({ data }) => (
  <div className="activities-page">
    <h1>Activitats</h1>
    <pre>{JSON.stringify(data, null, 2)}</pre>
  </div>
);

const TermsPage = props => (
  <MainLayout>
    <Terms {...props} />
  </MainLayout>
);

export default TermsPage;
