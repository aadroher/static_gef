import React from 'react';
import { graphql } from 'gatsby';

export const query = graphql`
  query Term($id: String) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        visible
        languageCode
        createdAt
        contentType
      }
      html
      rawMarkdownBody
    }
  }
`;

const Term = ({ pageContext, data }) => (
  <>
    <pre>{JSON.stringify(pageContext, null, 2)}</pre>
    <pre>{JSON.stringify(data, null, 2)}</pre>
  </>
);

export default Term;
