import { resolve } from 'path';

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
  const { createNodeField, createNode, createFilePath } = actions;
  if (type === 'MarkdownRemark') {
    const slug = createFilePath({ node, getNode, basePath: 'pages' });
    console.log(slug);
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

  console.log(data);

  // data.allMarkdownRemark.edges.forEach(({ node }) => {
  //   const {
  //     fields: { slug }
  //   } = node;
  //   const pagePath = slug.replace('/collections', '');
  //   createPage({
  //     path: pagePath,
  //     component: resolve(`./src/templates/activity.jsx`),
  //     context: {
  //       slug
  //     }
  //   });
  // });
};

export { createSchemaCustomization, onCreateNode, createPages };
