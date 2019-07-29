import React from 'react';

export default ({ data: { markdownRemark: activity } }) => (
  <div>
    <h2>{activity.frontmatter.title}</h2>
    <div>{activity.frontmatter.languageCode}</div>
    <div dangerouslySetInnerHTML={{ __html: activity.html }} />
  </div>
);

export const query = graphql`
  query($slug: String) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`;
