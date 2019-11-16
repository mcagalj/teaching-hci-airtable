import React from "react"
import { Styled } from "theme-ui"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import BlogExcerpt from "../components/blog-excerpt"

const Blog = ({
  data: {
    allMdx: { posts },
  },
}) => {
  return (
    <Layout>
      <SEO title="Blog" />
      <h1>Blog posts</h1>
      <BlogExcerpt posts={posts} />
    </Layout>
  )
}

export default Blog

export const query = graphql`
  query BlogIndexOld {
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
