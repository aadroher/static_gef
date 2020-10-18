import React from 'react';
import { graphql } from 'gatsby';

export const query = graphql`
  query Activity($contentType: String, $languageCode: String) {
    allMarkdownRemark(
      filter: {
        frontmatter: {
          visible: { eq: true }
          contentType: { eq: $contentType }
          languageCode: { eq: $languageCode }
        }
      }
    ) {
      nodes {
        parent {
          ... on File {
            relativePath
          }
        }
        frontmatter {
          title
          languageCode
          contentType
          createdAt
        }
        html
      }
    }
  }
`;

const Activity = ({ data }) => (
  <pre>{JSON.stringify(data, null, 2)}</pre>
  // <div>
  //   <h2>{title}</h2>
  //   <div>{languageCode}</div>
  //   <div dangerouslySetInnerHTML={{ __html: html }} />
  // </div>
);

export default Activity;
