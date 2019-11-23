/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import React from "react"
import {
  Alert,
  Close,
  Box,
  Grid,
  Card,
  Badge,
  Heading,
  Button,
  Flex,
  Label,
  Checkbox,
} from "@theme-ui/components"
import Layout from "../components/layout"
import SEO from "../components/seo"

import { gql } from "apollo-boost"
import { useQuery } from "@apollo/react-hooks"

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
    }
  }
`

const Placeholder = () =>
  Array.from({ length: 5 }).map((_, index) => (
    <Box key={index} sx={{ minHeight: 400, bg: "indigo.2" }} />
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
    <Box
      sx={{
        display: "grid",
        gridGap: "10px",
        gridTemplateColumns: `repeat(auto-fill, minmax(350px, 1fr))`,
        gridAutoRows: `minmax(50px, auto)`,
        img: {
          display: "flex",
          width: "100%",
          height: "100%",
          objectFit: "cover",
        },
      }}
    >
      {loading && <Placeholder />}
      {data &&
        data.products.map((product, index) => {
          const { id, categories, credited_image } = product

          // credited_image is array
          // (at the moment we take only the first item)
          const { credit, image } = credited_image[0]

          return (
            <img
              key={id}
              src={process.env.GATSBY_CMS_URL + image.url}
              alt={credit}
            />
          )
        })}
    </Box>
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
