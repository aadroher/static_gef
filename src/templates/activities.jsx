import React from 'react';
import { graphql } from 'gatsby';
import { md5 } from 'pure-md5';

import Activity from '../components/Activity';
import MainLayout from '../layouts/MainLayout';

const Activities = props => {
  const {
    data: {
      allFile: { edges }
    }
  } = props;

  console.log(props);
  return (
    <div className="activities-page">
      <h1>Activitats</h1>
      <div>
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
      </div>
    </div>
  );
};

const ActivitiesPage = props => (
  <MainLayout>
    <Activities {...props} />
  </MainLayout>
);

// export const getQuery = languageCode => graphql`
//   query ActivitiesQuery {
//     allMarkdownRemark(filter: { frontmatter: { languageCode: { eq: "ca" } } }) {
//       nodes {
//         id
//         frontmatter {
//           title
//           contentType
//           languageCode
//           pageCode
//           createdAt
//           visible
//         }
//         rawMarkdownBody
//       }
//     }
//   }
// `;

export default ActivitiesPage;
