/** @jsx jsx */
import { Fragment } from "react"
import "typeface-ibm-plex-sans"
import { Global } from "@emotion/core"
import {
  css,
  jsx,
  Container as SiteContainer,
  Header,
  Main,
  Footer,
} from "theme-ui"

const Layout = ({ children }) => (
  <Fragment>
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
    <SiteContainer sx={{ maxWidth: "container" }}>
      <Header>My header</Header>
      <Main>{children}</Main>
      <Footer>My footer</Footer>
    </SiteContainer>
  </Fragment>
)

export default Layout
