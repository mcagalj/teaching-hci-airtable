/** @jsx jsx */
import { jsx } from "theme-ui"
import { graphql, Link } from "gatsby"
import { Styled } from "theme-ui"

import SEO from "../components/seo"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Layout from "../components/layout"
import Title from "../components/title"

export default ({ pageContext, data }) => {
  const { post } = data
  const { previous, next } = pageContext

  return (
    <Layout>
      <SEO title={post.frontmatter.title} />
      <Title>{post.frontmatter.title}</Title>
      <span sx={{ fontWeight: "body", color: "gray.5" }}>
        {post.frontmatter.date}
      </span>
      <MDXRenderer>{post.body}</MDXRenderer>
      <div sx={{ display: "flex", justifyContent: "space-between" }}>
        {previous && (
          <Link to={`blog/${previous.frontmatter.slug}`}>
            Previous: {previous.frontmatter.title}
          </Link>
        )}
        {next && (
          <Link to={`blog/${next.frontmatter.slug}`}>
            Next: {next.frontmatter.title}
          </Link>
        )}
      </div>
    </Layout>
  )
}

export const query = graphql`
  query BlogPost($slug: String!) {
    post: mdx(frontmatter: { slug: { eq: $slug } }) {
      id
      frontmatter {
        author
        date(formatString: "MMMM DD, YYYY")
        description
        slug
        title
      }
      body
    }
  }
`
