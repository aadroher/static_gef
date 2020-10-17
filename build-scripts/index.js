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
          pageCode
          visible
          createdAt
        }
        html
      }
    }
  }
`;

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

const createCollectionPages = ({ createPage, contentType, collection }) => {
  collection.forEach(({ relativePath, frontmatter, html }) => {
    console.log(relativePath);
    const pagePath = relativePath.replace('collections', '').replace('.md', '');

    console.log(pagePath);

    createPage({
      path: pagePath,
      component: resolve(`./src/templates/${contentType}.jsx`),
      context: {
        frontmatter,
        html
      }
    });
  });
};

const createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const contentType = 'activity';
  const collection = await getCollection({
    graphql,
    contentType,
    languageCode: 'ca'
  });

  createCollectionPages({ createPage, contentType, collection });
};

export { createPages };
