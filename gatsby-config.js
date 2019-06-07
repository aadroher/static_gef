module.exports = {
  siteMetadata: {
    title: "Grup d'Estudis Fenomenològics",
    siteUrl: 'https://www.grupdestudisfenomenologics.org',
    description: "Public site for the Grup d'Estudis Fenomenològics",
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'data',
        path: `${__dirname}/data/raw/`,
        ignore: [`**/\.*`],
      },
    },
  ],
};
