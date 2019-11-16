/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require(`path`)

// // Implement the Gatsby API “onCreatePage”. This is
// // called after every page is created.
// exports.onCreatePage = async ({ page, actions }) => {
//   const { createPage } = actions
//   // page.matchPath is a special key that's used for matching pages
//   // only on the client.
//   if (page.path.match(/^\/questions/)) {
//     page.matchPath = "/questions/*"
//     // Update the page.
//     createPage(page)
//   }
// }

// exports.createPages = async ({ actions, graphql }) => {
//   const { createPage } = actions
//   const blogPost = path.resolve(`./src/templates/blog-post.js`)

//   const {
//     data: {
//       allMdx: { posts },
//     },
//   } = await graphql(`
//     query BlogIndex {
//       allMdx(
//         filter: {
//           fileAbsolutePath: { regex: "//content/blog//" }
//           frontmatter: { published: { eq: true } }
//         }
//       ) {
//         posts: edges {
//           post: node {
//             id
//             frontmatter {
//               author
//               date(formatString: "MMMM DD, YYYY")
//               description
//               slug
//               title
//             }
//             excerpt(pruneLength: 120)
//           }
//         }
//       }
//     }
//   `)

//   posts.forEach(({ post }) => {
//     const { slug } = post.frontmatter
//     createPage({
//       path: `/blog/${slug}`,
//       component: blogPost,
//       context: {
//         // additional data can be passed via context;
//         // this will be used in the GraphQL query as
//         // an query variable
//         slug,
//       },
//     })
//   })
// }

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions
  const blogList = path.resolve(`./src/templates/blog-list.js`)
  const blogPost = path.resolve(`./src/templates/blog-post.js`)

  const {
    data: {
      allMdx: { posts },
    },
  } = await graphql(`
    query BlogPages {
      allMdx(
        sort: { fields: [frontmatter___date], order: DESC }
        filter: {
          fileAbsolutePath: { regex: "//content/blog//" }
          frontmatter: { published: { eq: true } }
        }
      ) {
        posts: edges {
          post: node {
            frontmatter {
              slug
              title
            }
          }
        }
      }
    }
  `)

  // Creating blog post pages
  posts.forEach(({ post }, index) => {
    const { slug } = post.frontmatter
    const previous = index === 0 ? null : posts[index - 1].post
    const next = index === posts.length - 1 ? null : posts[index + 1].post

    createPage({
      path: `/blog/${slug}`,
      component: blogPost,
      context: {
        // additional data can be passed via context;
        // this will be used in the GraphQL query as
        // an query variable
        slug,
        previous,
        next,
      },
    })
  })

  // Creating blog post list pages
  const postsPerPage = 3
  const numPages = Math.ceil(posts.length / postsPerPage)

  Array.from({ length: numPages }).forEach((_, index) => {
    createPage({
      path: index === 0 ? `/blog` : `/blog/${index + 1}`,
      component: blogList,
      context: {
        // additional data can be passed via context;
        // this will be used in the GraphQL query as
        // an query variable
        limit: postsPerPage,
        skip: index * postsPerPage,
        numPages,
        currentPage: index + 1,
      },
    })
  })
}
