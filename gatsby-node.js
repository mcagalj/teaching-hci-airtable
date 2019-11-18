/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require(`path`)

// const { createRemoteFileNode } = require(`gatsby-source-filesystem`)

// exports.onCreateNode = async ({
//   node,
//   actions,
//   store,
//   cache,
//   createNodeId,
// }) => {
//   const { createNode, createNodeField } = actions

//   if (node.internal.type !== null && node.internal.type === "StrapiProduct") {
//     for (const image of node.image) {
//       const imageNode = await createRemoteFileNode({
//         url: `http://localhost:1337${image.url}`,
//         store,
//         cache,
//         createNode,
//         createNodeId,
//       })

//       if (imageNode) {
//         createNodeField({
//           node,
//           name: `image___NODE`,
//           value: imageNode.id,
//         })
//       }
//     }
//   }
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
