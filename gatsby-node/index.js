const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

const onCreateNode = ({ node, getNode, actions }) => {
  const {
    internal: { type },
  } = node;
  const { createNodeField } = actions;
  if (type === 'MarkdownRemark') {
    const slug = createFilePath({ node, getNode, basePath: 'pages' });
    createNodeField({
      node,
      name: 'slug',
      value: slug,
    });
  }
};

const createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const { data } = await graphql(/* GraphQL */ `
    {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
              languageCode
            }
            html
          }
        }
      }
    }
  `);

  data.allMarkdownRemark.edges.forEach(({ node }) => {
    const {
      fields: { slug },
    } = node;
    const pagePath = slug.replace('/collections', '');
    console.log({ pagePath });
    createPage({
      path: pagePath,
      component: path.resolve(`./src/templates/activity.jsx`),
      context: {
        slug,
      },
    });
  });
};

module.exports = {
  onCreateNode,
  createPages,
};
