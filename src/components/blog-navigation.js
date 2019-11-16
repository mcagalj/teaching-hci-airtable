/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link } from "gatsby"

const BlogLink = ({ ...prop }) => (
  <Link
    {...prop}
    sx={{
      display: "inline-block",
      width: ["90%", "auto"],
      overflow: "hidden",
      textOverflow: "ellipsis",
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
    }}
  />
)

BlogNav.Link = BlogLink
BlogNav.Previous = BlogPrevious
BlogNav.Next = BlogNext

export default BlogNav
