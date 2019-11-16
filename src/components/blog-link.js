/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link } from "gatsby"

const BlogLink = ({ ...prop }) => (
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

export default BlogLink
