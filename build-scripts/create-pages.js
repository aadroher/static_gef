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

const getActivity = ({
  frontmatter: { title, languageCode, createdAt },
  html
}) => ({
  title,
  languageCode,
  createdAt,
  html
});

const getCollection = async ({ graphql, contentType, languageCode }) => {
  const { data } = await graphql(markdownQuery, {
    contentType,
    languageCode
  });

  const collectionItems = data.allMarkdownRemark.nodes.map(
    ({ parent: { relativePath }, frontmatter, html }) => ({
      relativePath,
      frontmatter,
      html
    })
  );

  return collectionItems;
};

const getPagePath = relativePath =>
  relativePath
    .replace('collections', '')
    .replace('_', '/')
    .replace('.md', '');

const createCollectionPages = ({ createPage, contentType, collection }) => {
  collection.forEach(({ relativePath, frontmatter, html }) => {
    createPage({
      path: getPagePath(relativePath),
      component: resolve(`./src/templates/${contentType}.jsx`),
      context: getActivity({
        frontmatter,
        html
      })
    });
  });
};

const createPages = ({ graphql, actions: { createPage } }) =>
  Promise.all(
    languageCodes
      .map(languageCode =>
        contentTypes.map(async contentType => {
          const collection = await getCollection({
            graphql,
            contentType,
            languageCode
          });

          createCollectionPages({ createPage, contentType, collection });
        })
      )
      .flat()
  );

export default createPages;
