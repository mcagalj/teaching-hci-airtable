/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import { Grid, Card, Badge, Heading, Button, Flex } from "@theme-ui/components"
import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Product = ({ data: { product } }) => {
  return (
    <Layout>
      <SEO title={`Product - ${product.name}`} />
      <h1 sx={{ my: [3, 4] }}>
        {product.name} (statically sourced from Strapi)
      </h1>
      <p>{product.description}</p>
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
