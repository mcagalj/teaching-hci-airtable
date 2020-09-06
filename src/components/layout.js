/** @jsx jsx */
import React from "react"
import { css, jsx } from "theme-ui"
import { useStaticQuery, graphql } from "gatsby"
import { Global } from "@emotion/core"
import { MDXProvider } from "@mdx-js/react"
import * as components from "theme-ui"
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
            cart
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
          a: {
            textDecoration: "none",
          },
        })}
      />
      <SiteContainer>
        <Navigation menuItems={data.site.siteMetadata.menuItems} />

        <main sx={{ flex: "1 1 auto" }}>
          <Container>{children}</Container>
        </main>

        <Footer />
      </SiteContainer>
    </>
  )
}

export default ({ children }) => (
  <MDXProvider components={components}>
    <Layout>{children}</Layout>
  </MDXProvider>
)
