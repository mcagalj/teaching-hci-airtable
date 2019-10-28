module.exports = {
  siteMetadata: {
    title: `Teaching HCI tutorial`,
    description: `The title says it all.`,
    menuItems: [
      {
        text: "Naslovna",
        path: "/",
      },
      {
        text: "Predavanja",
        path: "/predavanja",
      },
      {
        text: "Projekti",
        path: "/projekti",
      },
      {
        text: "Rezultati",
        path: "/rezultati",
      },
      {
        text: "Ocjenjivanje",
        path: "/ocjenjivanje",
      },
      {
        text: "Blog",
        path: "/blog",
      },
      {
        text: "Q&A",
        path: "/questions",
      },
    ],
    author: `MC`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-theme-ui`,
    {
      resolve: "gatsby-theme-style-guide",
      options: {
        // sets path for generated page
        basePath: "/design-system",
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Teaching HCI@FESB`,
        short_name: `HCI@FESB`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/hci-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
