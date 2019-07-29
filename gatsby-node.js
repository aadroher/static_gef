const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

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

const createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  return graphql(`
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
  `).then(result => {
    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      console.log(node.fields.slug);
      createPage({
        path: node.fields.slug,
        component: path.resolve(`./src/pages/activity.jsx`),
        context: {
          // Data passed to context is available
          // in page queries as GraphQL variables.
          slug: node.fields.slug,
        },
      });
    });
  });
};

module.exports = {
  onCreateNode,
  createPages,
};
