import React from "react"
import { Link } from "gatsby"

import { Global } from "@emotion/core"
import { css, Footer } from "theme-ui"

const IndexPage = () => (
  <>
    <Global
      styles={css({
        "*": {
          boxSizing: `inherit`,
        },
        body: {
          margin: 0,
          padding: 0,
          boxSizing: `border-box`,
          textRendering: `optimizeLegibility`,
          fontSize: `18px`,
          WebkitFontSmoothing: `antialiased`,
          MozOsxFontSmoothing: `grayscale`,
          color: `text`,
          backgroundColor: `background`,
          fontFamily: `body`,
          lineHeight: `body`,
          fontWeight: `body`,
        },
      })}
    />

    <h1>Teaching HCI</h1>
    <h2>Examples:</h2>
    <ul>
      <li>
        <Link to="/examples/example-1">Example 1</Link>
      </li>
      <li>
        <Link to="/examples/example-2">Example 2</Link>
      </li>
      <li>
        <Link to="/examples/example-3">Example 3</Link>
      </li>
    </ul>

    <Link to="/products">
      <h2>Poducts</h2>
    </Link>

    <Link to="/blog">
      <h2>Blog</h2>
    </Link>

    <Footer>My footer</Footer>
  </>
)

export default IndexPage
