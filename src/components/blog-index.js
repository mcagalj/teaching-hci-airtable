/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import { Link } from "gatsby"

export default ({ posts }) => {
  const postsList = posts.map(({ post }) => {
    const { id, excerpt } = post
    const { title, date, slug } = post.frontmatter
    return (
      <section key={id} sx={{ mb: [4, 5] }}>
        <Styled.h4 sx={{ mb: 1 }}>
          <Styled.a as={Link} to={`/blog/${slug}`}>
            {title}
          </Styled.a>
        </Styled.h4>
        <span sx={{ fontWeight: "body", fontSize: 1, color: "gray.5" }}>
          {date}
        </span>
        <Styled.p sx={{ m: 0 }}>{excerpt}</Styled.p>
      </section>
    )
  })

  return postsList
}
