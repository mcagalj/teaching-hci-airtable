/** @jsx jsx */
import { jsx } from "theme-ui"
import { Grid, Card, Box, Flex, Heading } from "@theme-ui/components"
import { graphql } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { CartButton } from "../components/products"

const Product = ({ data: { product } }) => {
  const { data } = product
  const {
    name,
    description,
    image: {
      localFiles: [image],
    },
  } = data
  return (
    <Layout>
      <SEO title={`Product - ${name}`} />

      <Heading sx={{ my: [3, 4] }}>{name}</Heading>

      <Grid gap={4} columns={[1, null, 3]} sx={{ my: [3, 4] }}>
        <Card sx={{ gridColumn: ["1", null, "1 / span 2"] }}>
          <Img
            fluid={{
              ...image.sharp.fluid,
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
          <Grid columns={2}>
            {Array.from({ length: 4 }).map((_, index) => (
              <Img
                key={index}
                fluid={{
                  ...image.sharp.fluid,
                  aspectRatio: 21 / 15,
                }}
              />
            ))}
          </Grid>

          <Box>
            <p>{description}</p>
            <CartButton product={product} sx={{ width: "100%" }} />
          </Box>
        </Flex>
      </Grid>
    </Layout>
  )
}

export default Product

export const query = graphql`
  query ProductQuery($id: String!) {
    product: airtable(table: { eq: "Products" }, recordId: { eq: $id }) {
      id: recordId
      data {
        name
        description
        price
        image_credit
        image {
          localFiles {
            sharp: childImageSharp {
              fluid(maxWidth: 1200) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`
