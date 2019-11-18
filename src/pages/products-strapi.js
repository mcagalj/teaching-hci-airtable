/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import { Grid, Card } from "@theme-ui/components"
import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Products = ({ data: { allStrapiProduct } }) => {
  const { products } = allStrapiProduct

  return (
    <Layout>
      <SEO title="Products - Strapi" />
      <h1>Products (sourced from Strapi)</h1>

      <Grid gap={[4]} columns={[1, 2, null, 3]}>
        {products.map(({ product }, index) => {
          console.log(product)
          return (
            <Card key={product.id}>
              <Img
                fluid={{
                  ...product.image.credited_image.sharp.fluid,
                  aspectRatio: 21 / 15,
                }}
              />
              <p sx={{ mt: 1, mb: 0 }}>
                by{" "}
                <span sx={{ fontWeight: "medium", color: "accent" }}>
                  {product.name}
                </span>
              </p>
            </Card>
          )
        })}
      </Grid>
    </Layout>
  )
}

export default Products

// export const query = graphql`
//   query ProductQuery {
//     allStrapiProduct {
//       products: edges {
//         product: node {
//           id
//           name
//           description
//           price
//           image {
//             credit
//             credited_image {
//               sharp: childImageSharp {
//                 fluid(maxWidth: 400, traceSVG: { color: "#c3dafe" }) {
//                   ...GatsbyImageSharpFluid
//                 }
//               }
//             }
//           }
//           categories {
//             id
//             name
//           }
//         }
//       }
//     }
//   }
// `
