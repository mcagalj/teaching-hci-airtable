/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import { Grid, Card, Box, Button, Flex, Heading } from "@theme-ui/components"
import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Product = ({ data: { product } }) => {
  return (
    <Layout>
      <SEO title={`Product - ${product.name}`} />

      <Heading sx={{ my: [3, 4] }}>{product.name}</Heading>

      <Grid gap={4} columns={[1, null, 3]} sx={{ my: [3, 4] }}>
        <Card sx={{ gridColumn: ["1", null, "1 / span 2"] }}>
          <Img
            fluid={{
              ...product.credited_image[0].image.sharp.fluid,
              aspectRatio: 21 / 15,
            }}
          />
        </Card>

        <Flex
          sx={{
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
          }}
        >
          <Grid columns="2">
            {Array.from({ length: 4 }).map((_, index) => (
              <Img
                key={index}
                fluid={{
                  ...product.credited_image[0].image.sharp.fluid,
                  aspectRatio: 21 / 15,
                }}
              />
            ))}
          </Grid>

          <Box>
            <p>{product.description}</p>
            <Button variant="secondary" sx={{ width: "100%" }}>
              Add to cart (${product.price})
            </Button>
          </Box>
        </Flex>
      </Grid>
    </Layout>
  )
}

export default Product

export const query = graphql`
  query ProductQuery($id: String!) {
    product: strapiProduct(id: { eq: $id }) {
      id
      name
      price
      description
      credited_image {
        credit
        image {
          sharp: childImageSharp {
            fluid(maxWidth: 1200, traceSVG: { color: "#c3dafe" }) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
