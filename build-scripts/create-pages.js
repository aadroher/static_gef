// import { graphql } from 'gatsby';
import { resolve } from 'path';
import pluralize from 'pluralize';

const languageCodes = ['ca', 'en', 'es'];
const contentTypes = ['activity'];

const markdownQuery = /* GraphQL */ `
  query($contentType: String, $languageCode: String) {
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
            id
            relativePath
          }
        }
      }
    }
  }
`;

const getItemPagePath = relativePath =>
  relativePath
    .replace('collections', '')
    .replace('_', '/')
    .replace('.md', '');

const createPages = ({ graphql, actions: { createPage } }) =>
  Promise.all(
    languageCodes
      .map(languageCode =>
        contentTypes.map(async contentType => {
          const { data } = await graphql(markdownQuery, {
            contentType,
            languageCode
          });

          // Create item pages
          data.allMarkdownRemark.nodes.forEach(
            ({ parent: { id, relativePath } }) => {
              createPage({
                path: getItemPagePath(relativePath),
                component: resolve(`./src/templates/${contentType}.jsx`),
                context: {
                  id,
                  languageCode,
                  contentType
                }
              });
            }
          );
        })
      )
      .flat()
  );

export default createPages;
