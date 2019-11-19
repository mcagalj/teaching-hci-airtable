/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import { Grid, Card, Badge, Heading, Button, Flex } from "@theme-ui/components"
import React from "react"
import { graphql, Link } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Products = ({ data: { allStrapiProduct } }) => {
  const { products } = allStrapiProduct

  return (
    <Layout>
      <SEO title="Products" />
      <h1 sx={{ my: [3, 4] }}>Products (statically sourced from Strapi)</h1>

      <Grid gap={[5]} columns={[1, 2]}>
        {products.map(({ product }, index) => {
          const { id, categories, credited_image } = product

          // credited_image is array
          // (at the moment we take only the first item)
          const { credit, image } = credited_image[0]

          return (
            <Card key={id} variant="secondary">
              <div sx={{ position: "relative" }}>
                <Link
                  to={`/products/${id}`}
                  sx={{
                    ":hover > div": {
                      filter: "opacity(0.8)",
                    },
                  }}
                >
                  <Img
                    fluid={{
                      ...image.sharp.fluid,
                      aspectRatio: 21 / 15,
                    }}
                  />
                </Link>
                <Badge
                  variant="priceTag"
                  sx={{
                    position: "absolute",
                    top: 1,
                    left: 1,
                  }}
                >
                  ${product.price}
                </Badge>
                <p
                  sx={{
                    position: "absolute",
                    left: 1,
                    bottom: 1,
                    fontSize: 0,
                    bg: "light",
                    color: "textMuted",
                    m: 0,
                    px: 2,
                  }}
                >
                  {credit}
                </p>
              </div>

              <Heading sx={{ my: 2 }}>{product.name}</Heading>
              <Flex
                sx={{ justifyContent: "space-between", alignItems: "flex-end" }}
              >
                {categories.map(({ name, id }) => (
                  <Badge key={id} variant="outline">
                    {name}
                  </Badge>
                ))}
                <Button variant="secondary">
                  Add to cart (${product.price})
                </Button>
              </Flex>
            </Card>
          )
        })}
      </Grid>
    </Layout>
  )
}

export default Products

export const query = graphql`
  query ProductsQuery {
    allStrapiProduct {
      products: edges {
        product: node {
          id
          credited_image {
            credit
            image {
              sharp: childImageSharp {
                fluid(maxWidth: 400, traceSVG: { color: "#c3dafe" }) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          categories {
            name
            id
          }
          name
          price
          description
        }
      }
    }
  }
`
