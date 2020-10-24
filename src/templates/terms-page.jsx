import React from 'react';
import { graphql } from 'gatsby';

import MainLayout from '../layouts/default';

export const query = graphql`
  query Terms($markdownNodeId: String, $collectionmarkdownNodeIds: [String]) {
    meta: markdownRemark(id: { eq: $markdownNodeId }) {
      frontmatter {
        contentType
        languageCode
        title
      }
      html
      rawMarkdownBody
    }
    termPages: allSitePage(
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
    terms: allMarkdownRemark(
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

const Terms = ({ data }) => (
  <div className="terms-page">
    <h1>Vocabulari</h1>
    <pre>{JSON.stringify(data, null, 2)}</pre>
  </div>
);

const TermsPage = props => (
  <MainLayout>
    <Terms {...props} />
  </MainLayout>
);

export default TermsPage;
