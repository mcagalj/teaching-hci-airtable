/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require(`path`)

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions
  const blogList = path.resolve(`./src/templates/blog-list.js`)
  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const productTemplate = path.resolve(`./src/templates/product.js`)

  // blog post
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

  // products from Airtable
  const {
    data: {
      productsTable: { products },
    },
  } = await graphql(`
    query AirtableProductsQuery {
      productsTable: allAirtable(filter: { table: { eq: "Products" } }) {
        products: edges {
          product: node {
            id: recordId
          }
        }
      }
    }
  `)

  // Create blog post pages
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

  // Create blog post list pages
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

  // Create product pages
  products.forEach(({ product }, index) => {
    createPage({
      path: `/products/${product.id}`,
      component: productTemplate,
      context: {
        id: product.id,
      },
    })
  })
}
