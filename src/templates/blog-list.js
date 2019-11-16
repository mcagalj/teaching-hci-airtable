/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import { graphql, Link } from "gatsby"

import SEO from "../components/seo"
import Layout from "../components/layout"
import BlogExcerpt from "../components/blog-excerpt"

const BlogListLink = ({ ...prop }) => (
  <Link
    {...prop}
    sx={{
      display: "inline-block",
      px: 3,
      color: "primary",
      backgroundColor: "indigo.1",
      textDecoration: "none",
      textTransform: "uppercase",
      fontWeight: "light",
      lineHeight: "navLink",
      whiteSpace: "nowrap",
      letterSpacing: "tight",
      transition: "all 0.25s linear",
      "&:hover": {
        color: "white",
        backgroundColor: "blue.9",
      },
    }}
  />
)
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

      <nav
        sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}
      >
        <div sx={{ width: "50%" }}>
          {!isFirst && (
            <BlogListLink to={previousPage}>Previous Page</BlogListLink>
          )}
        </div>
        <div sx={{ width: "50%", textAlign: "right" }}>
          {!isLast && <BlogListLink to={nextPage}>Next Page</BlogListLink>}
        </div>
      </nav>
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
