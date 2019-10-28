/** @jsx jsx */
import React from "react"
import { useStaticQuery, graphql } from "gatsby"
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

import Navigation from "../components/navigation"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          menuItems {
            text
            path
          }
        }
      }
    }
  `)

  return (
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
        <Navigation menuItems={data.site.siteMetadata.menuItems} />
        <Header>My header</Header>
        <Main>{children}</Main>
        <Footer>My footer</Footer>
      </SiteContainer>
    </>
  )
}

export default Layout
