/** @jsx jsx */
import { jsx } from "theme-ui"
import { graphql } from "gatsby"

import SEO from "../components/seo"
import Layout from "../components/layout"
import BlogExcerpt from "../components/blog-excerpt"
import BlogNav from "../components/blog-navigation"

const BlogList = ({
  pageContext,
  data: {
    allMdx: { posts },
  },
}) => {
  console.log(pageContext)
  const { currentPage, numPages } = pageContext
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const previousPage =
    currentPage - 1 === 1 ? "blog/" : `blog/${(currentPage - 1).toString()}`
  const nextPage = `blog/${(currentPage + 1).toString()}`

  return (
    <Layout>
      <SEO title="Blog" />
      <h1>Blog posts</h1>
      <BlogExcerpt posts={posts} />

      <BlogNav>
        <BlogNav.Previous>
          {!isFirst && (
            <BlogNav.Link to={previousPage}>Previous Page</BlogNav.Link>
          )}
        </BlogNav.Previous>

        <BlogNav.Next>
          {!isLast && <BlogNav.Link to={nextPage}>Next Page</BlogNav.Link>}
        </BlogNav.Next>
      </BlogNav>
    </Layout>
  )
}

export default BlogList

export const query = graphql`
  query BlogList($skip: Int!, $limit: Int!) {
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        fileAbsolutePath: { regex: "//content/blog//" }
        frontmatter: { published: { eq: true } }
      }
      limit: $limit
      skip: $skip
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
