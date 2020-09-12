/** @jsx jsx */
import React from "react"
import { jsx, Styled } from "theme-ui"
import { Grid } from "@theme-ui/components"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Container from "../components/container"
import Lecturers from "../components/lecturers"
import FilteredGallery from "../components/filtered-gallery"

const IndexPage = ({ data }) => {
  const {
    heroImage400,
    heroImage600,
    heroImage800,
    heroImage,
    contact,
    imageFiles,
  } = data

  return (
    <>
      {/* We try to manually optimize the header for LCP metric of Google */}
      <div
        sx={{
          position: "relative",
          height: [150, 200, 250],
        }}
      >
        <picture>
          <source
            media="(max-width: 400px)"
            srcSet={heroImage400.sharp.fixed.srcSetWebp}
            type="image/webp"
          />
          <source
            media="(min-width: 401px) and (max-width: 600px)"
            srcSet={heroImage600.sharp.fixed.srcSetWebp}
            type="image/webp"
          />
          <source
            media="(min-width: 601px) and (max-width: 800px)"
            srcSet={heroImage800.sharp.fixed.srcSetWebp}
            type="image/webp"
          />
          <source
            media="(min-width: 801px)"
            srcSet={heroImage.sharp.fixed.srcSetWebp}
            type="image/webp"
          />
          <source
            media="(max-width: 400px)"
            srcSet={heroImage400.sharp.fixed.srcSet}
          />
          <source
            media="(min-width: 401px) and (max-width: 600px)"
            srcSet={heroImage600.sharp.fixed.srcSet}
          />
          <source
            media="(min-width: 601px) and (max-width: 800px)"
            srcSet={heroImage800.sharp.fixed.srcSet}
          />
          <source
            media="(min-width: 801px)"
            srcSet={heroImage.sharp.fixed.srcSet}
          />
          <source srcSet={heroImage.sharp.fixed.srcWebp} type="image/webp" />
          <img
            src={heroImage.sharp.fixed.src}
            alt="Hero image"
            loading="eager"
            sx={{
              height: [150, 200, 250],
              width: "100%",
              objectFit: "cover",
            }}
          />
        </picture>

        <div
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `linear-gradient(to right, #00416Add 4rem, #E4E5E600)`,
          }}
        >
          <Container>
            <h1
              sx={{
                m: 0,
                pt: [4, 5],
                fontSize: [5, 6, 7],
                fontWeight: "semibold",
                color: "white",
              }}
            >
              Teaching HCI
            </h1>
          </Container>
        </div>
      </div>
      <Layout>
        <SEO title="Naslovna" />

        <h1>Kratko o predmetu</h1>
        <Grid gap={[4, 4, 2]} columns={[1, 2, 3]} sx={{ alignItems: "end" }}>
          <Lecturers />
          <Styled.blockquote sx={{ m: 0 }}>
            Kada: utorkom, 08h15-10h00 <br />
            Gdje: C501
          </Styled.blockquote>
        </Grid>

        <h2>Galerija</h2>
        <FilteredGallery images={imageFiles.images} sx={{ my: 3 }} />

        <h2>Kontakt</h2>
        <MDXRenderer>{contact.body}</MDXRenderer>
      </Layout>
    </>
  )
}

export default IndexPage

export const query = graphql`
  {
    heroImage400: file(relativePath: { eq: "images/hero.jpg" }) {
      sharp: childImageSharp {
        fixed(width: 400) {
          srcSetWebp
          srcSet
          srcWebp
          src
        }
      }
    }

    heroImage600: file(relativePath: { eq: "images/hero.jpg" }) {
      sharp: childImageSharp {
        fixed(width: 600) {
          srcSetWebp
          srcSet
          srcWebp
          src
        }
      }
    }

    heroImage800: file(relativePath: { eq: "images/hero.jpg" }) {
      sharp: childImageSharp {
        fixed(width: 800) {
          srcSetWebp
          srcSet
          srcWebp
          src
        }
      }
    }

    heroImage: file(relativePath: { eq: "images/hero.jpg" }) {
      sharp: childImageSharp {
        fixed(width: 1920) {
          srcSetWebp
          srcSet
          srcWebp
          src
        }
      }
    }

    contact: mdx(fileAbsolutePath: { regex: "/contact.md/" }) {
      body
    }

    imageFiles: allFile(
      filter: { absolutePath: { regex: "//content/images//" } }
    ) {
      images: edges {
        image: node {
          id
          base
          sharp: childImageSharp {
            fluid(maxWidth: 400, quality: 70) {
              ...GatsbyImageSharpFluid_withWebp_noBase64
            }
          }
        }
      }
    }
  }
`
