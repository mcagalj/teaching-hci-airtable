/** @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"
import { Alert, Close, Box, Grid, Card, Flex } from "@theme-ui/components"
import { gql } from "apollo-boost"
import { useQuery } from "@apollo/react-hooks"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { ProductCard, ImageContainer } from "../components/products"

const GET_PRODUCTS = gql`
  query Products {
    products {
      id
      name
      description
      price
      credited_image {
        id
        image {
          url
        }
      }
      categories {
        id
        name
      }
    }
  }
`

const ProductCardsPlaceholder = ({ count = 5 }) =>
  Array.from({ length: count }).map((_, index) => (
    <Card key={index} variant="placeholder">
      <ImageContainer>
        <Box variant="placeholder" />
      </ImageContainer>
      <Box variant="placeholder" sx={{ my: 2, height: "40px", width: "40%" }} />
      <Flex sx={{ justifyContent: "space-between", alignItems: "flex-end" }}>
        <Box variant="placeholder" sx={{ height: "20px", width: "20%" }} />
        <Box sx={{ height: "40px", width: "40%", bg: "accent" }} />
      </Flex>
    </Card>
  ))

const Content = () => {
  const { loading, error, data } = useQuery(GET_PRODUCTS)

  if (error) {
    return (
      <Alert variant="error">
        Error loading data.
        <Close ml="auto" mr={-2} sx={{ height: "auto", width: "auto" }} />
      </Alert>
    )
  }

  return (
    <Grid gap={[4, 4, 4, 5]} columns={[1, 2]}>
      {loading && <ProductCardsPlaceholder />}
      {data &&
        data.products.map((product, index) => {
          const { id } = product
          return <ProductCard key={id} {...product} />
        })}
    </Grid>
  )
}

const DynamicContent = () => {
  return (
    <Layout>
      <SEO title="Dynamic content" />
      <h1 sx={{ my: [3, 4] }}>Dynamically fetched content</h1>
      <Content />
    </Layout>
  )
}

export default DynamicContent
