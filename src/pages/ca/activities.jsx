import React from 'react';

import Activities from '../../templates/activities';

export const query = graphql`
  query ActivitiesCaQuery {
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

const ActivitiesCa = props => <Activities {...props} />;

export default ActivitiesCa;
