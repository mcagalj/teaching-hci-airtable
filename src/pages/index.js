/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Container from "../components/container"

const IndexPage = ({ data }) => {
  const { heroImage } = data

  return (
    <>
      <div
        sx={{
          height: 300,
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${heroImage.sharp.fluid.src})`,
        }}
      >
        <Container>
          <h1
            sx={{
              m: 0,
              pt: 4,
              fontSize: [5, 6, 7],
              fontWeight: "medium",
              color: "white",
            }}
          >
            Teaching HCI
          </h1>
        </Container>
      </div>
      <Layout>
        <SEO title="Naslovna" />
        {/* <img src={heroImage.sharp.fluid.src} /> */}
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
        }
      }
    }
  }
`
