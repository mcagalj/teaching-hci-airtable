/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require(`path`)

// Implement the Gatsby API “onCreatePage”. This is
// called after every page is created.
exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions
  // page.matchPath is a special key that's used for matching pages
  // only on the client.
  if (page.path.match(/^\/questions/)) {
    page.matchPath = "/questions/*"
    // Update the page.
    createPage(page)
  }
}

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions
  const blogPost = path.resolve(`./src/templates/blog-post.js`)

  const {
    data: {
      allMdx: { posts },
    },
  } = await graphql(`
    query BlogIndex {
      allMdx(
        filter: {
          fileAbsolutePath: { regex: "//content/blog//" }
          frontmatter: { published: { eq: true } }
        }
      ) {
        posts: edges {
          post: node {
            id
            frontmatter {
              author
              date(formatString: "MMMM DD, YYYY")
              description
              slug
              title
            }
            excerpt(pruneLength: 120)
          }
        }
      }
    }
  `)

  posts.forEach(({ post }) => {
    const { slug } = post.frontmatter
    createPage({
      path: `/blog/${slug}`,
      component: blogPost,
      context: {
        // additional data can be passed via context;
        // this will be used in the GraphQL query as
        // an query variable
        slug,
      },
    })
  })
}
