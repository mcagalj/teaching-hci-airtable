/** @jsx jsx */
import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Global } from "@emotion/core"
import { css, jsx, Main } from "theme-ui"

import Navigation from "../components/navigation"
import Container from "../components/container"
import Footer from "../components/footer"

const SiteContainer = props => (
  <div
    {...props}
    sx={{
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh",
      margin: "0 auto",
    }}
  />
)

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          menuItems {
            text
            path
            partiallyActive
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
            boxSizing: `border-box`,
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
      <SiteContainer>
        <Navigation menuItems={data.site.siteMetadata.menuItems} />

        <Main>
          <Container>{children}</Container>
        </Main>

        <Footer />
      </SiteContainer>
    </>
  )
}

export default Layout
