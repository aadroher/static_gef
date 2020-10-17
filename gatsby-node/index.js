const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');
var { graphql, buildSchema } = require('graphql');
const activityType = require('./types/activity.graphql');

const schema = /* GraphQL */ `
  type Activity implements Node {
    name: String
  }
`;

const createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  createTypes(schema);
};

const onCreateNode = ({ node, getNode, actions }) => {
  const {
    internal: { type }
  } = node;
  const { createNodeField, createNode } = actions;
  if (type === 'MarkdownRemark') {
    const slug = createFilePath({ node, getNode, basePath: 'pages' });
    createNodeField({
      node,
      name: 'slug',
      value: slug
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
      fields: { slug }
    } = node;
    const pagePath = slug.replace('/collections', '');
    createPage({
      path: pagePath,
      component: path.resolve(`./src/templates/activity.jsx`),
      context: {
        slug
      }
    });
  });
};

module.exports = {
  createSchemaCustomization,
  onCreateNode,
  createPages
};
