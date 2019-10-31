/** @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"
import { graphql } from "gatsby"
import BackgroundImage from "gatsby-background-image"
import { MDXRenderer } from "gatsby-plugin-mdx"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Container from "../components/container"

const IndexPage = ({ data }) => {
  const { heroImage, indexMdx } = data

  return (
    <>
      {/* <div
        sx={{
          height: 300,
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${heroImage.sharp.fluid.src})`,
        }}
      >
        <Container>
          <h1
            sx={{
              m: 0,
              pt: 8,
              fontSize: [5, 6, 7],
              fontWeight: "medium",
              color: "white",
            }}
          >
            Teaching HCI
          </h1>
        </Container>
      </div>
       */}
      <BackgroundImage
        fluid={heroImage.sharp.fluid}
        sx={{
          height: [150, 200, 300],
        }}
      >
        <div
          sx={{
            height: "100%",
            width: "100%",
            backgroundImage: `linear-gradient(to right, #00416Add 4rem, #E4E5E600)`,
          }}
        >
          <Container>
            <h1
              sx={{
                m: 0,
                pt: [4, 5],
                fontSize: [5, 6, 7],
                fontWeight: "medium",
                color: "white",
              }}
            >
              Teaching HCI
            </h1>
          </Container>
        </div>
      </BackgroundImage>
      {/* <img src={heroImage.sharp.fluid.src} /> */}
      <Layout>
        <SEO title="Naslovna" />
        <MDXRenderer>{indexMdx.body}</MDXRenderer>
      </Layout>
    </>
  )
}

export default IndexPage

export const query = graphql`
  {
    heroImage: file(relativePath: { eq: "images/hero.jpg" }) {
      sharp: childImageSharp {
        fluid(maxWidth: 1920) {
          src
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }

    indexMdx: mdx(fileAbsolutePath: { regex: "/index.mdx/" }) {
      body
      frontmatter {
        title
      }
    }
  }
`
