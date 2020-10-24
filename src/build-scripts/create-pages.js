// import { graphql } from 'gatsby';
import { resolve } from 'path';
import pluralize from 'pluralize';

const languageCodes = ['ca', 'en', 'es'];
const contentTypes = ['activity', 'term'];

const collectionPageQuery = /* GraphQL */ `
  query($pageCode: String, $pathLanguageRegexString: String) {
    markdownRemark(
      frontmatter: { contentType: { eq: "page" }, pageCode: { eq: $pageCode } }
      fileAbsolutePath: { regex: $pathLanguageRegexString }
    ) {
      id
    }
  }
`;

const collectionItemsQuery = /* GraphQL */ `
  query($contentType: String, $pathLanguageRegexString: String) {
    allMarkdownRemark(
      filter: {
        frontmatter: {
          visible: { eq: true }
          contentType: { eq: $contentType }
        }
        fileAbsolutePath: { regex: $pathLanguageRegexString }
      }
    ) {
      nodes {
        id
        fileAbsolutePath
      }
    }
  }
`;

const getItemPagePath = fileAbsolutePath => {
  const [, relativePath] = fileAbsolutePath.split('/collections/');
  const [pluralContentType, languageCode, filename] = relativePath.split('/');
  const path = [languageCode, pluralContentType, filename]
    .join('/')
    .replace('_', '/')
    .replace('.md', '');
  return path;
};

const createPages = ({ graphql, actions: { createPage } }) =>
  Promise.all(
    languageCodes
      .map(languageCode =>
        contentTypes.map(async contentType => {
          const pluralContentType = pluralize(contentType);
          const pathLanguageRegexString = `/\\/${languageCode}\\//i`;

          const {
            data: {
              markdownRemark: { id: indexPageId }
            }
          } = await graphql(collectionPageQuery, {
            pathLanguageRegexString,
            pageCode: pluralContentType
          });

          const {
            data: {
              allMarkdownRemark: { nodes }
            }
          } = await graphql(collectionItemsQuery, {
            contentType,
            pathLanguageRegexString
          });

          const itemPagesData = nodes.map(({ id, fileAbsolutePath }) => ({
            id,
            fileAbsolutePath
          }));

          // Create collection index page
          createPage({
            path: `/${languageCode}/${pluralContentType}`,
            component: resolve(`./src/templates/${pluralContentType}-page.jsx`),
            context: {
              markdownNodeId: indexPageId,
              isIndex: true,
              languageCode,
              collectionmarkdownNodeIds: itemPagesData.map(({ id }) => id)
            }
          });

          // Create collection item pages
          itemPagesData.forEach(({ id: markdownNodeId, fileAbsolutePath }) => {
            createPage({
              path: getItemPagePath(fileAbsolutePath),
              component: resolve(`./src/templates/${contentType}-page.jsx`),
              context: {
                markdownNodeId,
                languageCode,
                isIndex: false
              }
            });
          });
        })
      )
      .flat()
  );

export default createPages;
