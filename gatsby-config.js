module.exports = {
  siteMetadata: {
    title: "Grup d'Estudis Fenomenològics",
    siteUrl: 'https://aadroher.gitlab.io',
    description: "Public site for the Grup d'Estudis Fenomenològics",
  },
  pathPrefix: '/gef',
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'data',
        path: `${__dirname}/data/`,
        ignore: [`**/\.*`],
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        // CommonMark mode (default: true)
        commonmark: true,
        // Footnotes mode (default: true)
        footnotes: true,
        // Pedantic mode (default: true)
        pedantic: true,
        // GitHub Flavored Markdown mode (default: true)
        gfm: true,
        // Plugins configs
        plugins: [],
      },
    },
    {
      resolve: 'gatsby-plugin-styled-components',
      options: {
        // Add any options here
        minify: false,
      },
    },
  ],
};
