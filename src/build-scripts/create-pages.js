// import { graphql } from 'gatsby';
import { resolve } from 'path';
import pluralize from 'pluralize';

const languageCodes = ['ca', 'en', 'es'];
const contentTypes = ['activity', 'term'];

const collectionPageQuery = /* GraphQL */ `
  query($languageCode: String, $pageCode: String) {
    markdownRemark(
      frontmatter: {
        contentType: { eq: "page" }
        languageCode: { eq: $languageCode }
        pageCode: { eq: $pageCode }
      }
    ) {
      id
    }
  }
`;

const collectionItemsQuery = /* GraphQL */ `
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
        id
        parent {
          ... on File {
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
          const pluralContentType = pluralize(contentType);

          const {
            data: {
              markdownRemark: { id: indexPageId }
            }
          } = await graphql(collectionPageQuery, {
            languageCode,
            pageCode: pluralContentType
          });

          const {
            data: {
              allMarkdownRemark: { nodes }
            }
          } = await graphql(collectionItemsQuery, {
            contentType,
            languageCode
          });

          const itemPagesData = nodes.map(
            ({ id, parent: { relativePath } }) => ({
              id,
              relativePath
            })
          );

          // Create collection index page
          createPage({
            path: `/${languageCode}/${pluralContentType}`,
            component: resolve(`./src/templates/${pluralContentType}.jsx`),
            context: {
              id: indexPageId,
              collectionIds: itemPagesData.map(({ id }) => id)
            }
          });

          // Create collection item pages
          itemPagesData.forEach(({ id, relativePath }) => {
            createPage({
              path: getItemPagePath(relativePath),
              component: resolve(`./src/templates/${contentType}.jsx`),
              context: {
                id
              }
            });
          });
        })
      )
      .flat()
  );

export default createPages;
