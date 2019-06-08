import React from 'react';

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

export default Activity;
