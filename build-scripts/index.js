import { resolve } from 'path';
import { createFilePath } from 'gatsby-source-filesystem';

const schema = /* GraphQL */ `
  type Activity implements Node {
    title: String
    languageCode: String
    visible: Boolean
    createdAt: Date
    htmlContent: String
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
  console.log({
    type
  });
  const { createNodeField, createNode } = actions;
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
        nodes {
          frontmatter {
            title
            languageCode
          }
          html
        }
      }
    }
  `);

  console.log(data);

  data.allMarkdownRemark.nodes.forEach(node => {
    console.log(node);
    // const {
    //   fields: { slug }
    // } = node;
    // const pagePath = slug.replace('/collections', '');
    // createPage({
    //   path: pagePath,
    //   component: resolve(`./src/templates/activity.jsx`),
    //   context: {
    //     slug
    //   }
    // });
  });
};

export { createSchemaCustomization, onCreateNode, createPages };
