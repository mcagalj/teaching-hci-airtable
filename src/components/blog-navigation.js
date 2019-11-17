/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link } from "gatsby"

export const rightArrow = (
  <svg
    fill="currentColor"
    preserveAspectRatio="xMidYMid meet"
    height="1em"
    width="1em"
    viewBox="0 0 40 40"
    style={{ verticalAlign: "middle" }}
  >
    <g>
      <path d="m20 6.6l13.4 13.4-13.4 13.4-2.3-2.4 9.3-9.4h-20.4v-3.2h20.4l-9.3-9.4z"></path>
    </g>
  </svg>
)

export const leftArrow = (
  <svg
    fill="currentColor"
    preserveAspectRatio="xMidYMid meet"
    height="1em"
    width="1em"
    viewBox="0 0 40 40"
    class="css-c6kzuz"
    style={{ verticalAlign: "middle" }}
  >
    <g>
      <path d="m33.4 18.4v3.2h-20.4l9.3 9.4-2.3 2.4-13.4-13.4 13.4-13.4 2.3 2.4-9.3 9.4h20.4z"></path>
    </g>
  </svg>
)

const BlogLink = ({ ...prop }) => (
  <Link
    {...prop}
    sx={{
      display: "inline-block",
      p: 3,
      color: "primary",
      backgroundColor: "gray.2",
      textDecoration: "none",
      textTransform: "uppercase",
      fontWeight: "medium",
      lineHeight: "body",
      letterSpacing: "tight",
      transition: "all 0.25s linear",
      "&:hover": {
        color: "primaryHover",
      },
    }}
  />
)

const BlogPrevious = ({ ...prop }) => (
  <div {...prop} sx={{ width: ["100%", "50%"] }} />
)

const BlogNext = ({ ...prop }) => (
  <div
    {...prop}
    sx={{
      width: ["100%", "50%"],
      marginTop: [2, 0],
      textAlign: "right",
    }}
  />
)

const BlogNav = ({ ...prop }) => (
  <nav
    {...prop}
    sx={{
      display: ["block", "flex"],
      justifyContent: "space-between",
      width: "100%",
      overflow: "hidden",
      mt: 4,
    }}
  />
)

BlogNav.Link = BlogLink
BlogNav.Previous = BlogPrevious
BlogNav.Next = BlogNext

export default BlogNav
