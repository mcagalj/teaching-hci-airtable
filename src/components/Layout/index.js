import React from "react"
import { Global } from "@emotion/core"
import { css, Footer } from "theme-ui"

const Layout = ({ children }) => (
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
    {children}
    <Footer>My footer</Footer>
  </>
)

export default Layout
