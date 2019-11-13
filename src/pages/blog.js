import React from "react"
import { Styled } from "theme-ui"

import Layout from "../components/layout"
import SEO from "../components/seo"
import BlogIndex from "../components/blog-index"

const Blog = ({
  data: {
    allMdx: { posts },
  },
}) => {
  return (
    <Layout>
      <SEO title="Blog" />
      <h1>Blog posts</h1>
      <BlogIndex posts={posts} />
    </Layout>
  )
}

export default Blog

export const query = graphql`
  query BlogIndex {
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
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
            slug
            title
          }
          excerpt(pruneLength: 200)
        }
      }
    }
  }
`
