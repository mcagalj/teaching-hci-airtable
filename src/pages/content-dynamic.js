/** @jsx jsx */
import { jsx } from "theme-ui"
import React, { useState, useMemo } from "react"
import { Alert, Close, Box, Grid, Card, Flex } from "@theme-ui/components"
import { Router, navigate } from "@reach/router"
import { gql } from "apollo-boost"
import { useQuery } from "@apollo/react-hooks"

import Layout from "../components/layout"
import SEO from "../components/seo"
import {
  ProductCard,
  ImageContainer,
  CategoryFilter,
} from "../components/products"

const PRODUCTS = gql`
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

    categories {
      name
      id
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

const FilteredProducts = ({ products, filters }) => (
  <>
    {products.map(product => {
      const { id, categories } = product

      // processing categories (extracting category names)
      // this is a one-time job, hence useMemo hook.
      const productCategories = useMemo(
        () => categories.map(({ name }) => name),
        [categories]
      )

      const filterHit = useMemo(
        () =>
          filters.length === 0
            ? true
            : productCategories.some(category => filters.includes(category)),
        [filters]
      )

      return filterHit ? (
        <ProductCard key={id} {...product} pathPrefix={"content-dynamic"} />
      ) : null
    })}
  </>
)

const ProductList = () => {
  const { loading, error, data } = useQuery(PRODUCTS)
  const [filters, setFilters] = useState([])

  return (
    <>
      <SEO title="Dynamic content" />
      <h1 sx={{ my: [3, 4] }}>Dynamically loading content</h1>
      {loading && (
        <Grid gap={[4, 4, 4, 5]} columns={[1, 2]}>
          <ProductCardsPlaceholder />
        </Grid>
      )}
      {data && (
        <>
          <Alert variant="info">NOTE: The images are not optimized.</Alert>
          <CategoryFilter
            categories={data.categories}
            filters={filters}
            setFilters={setFilters}
          />
          <Grid gap={[4, 4, 4, 5]} columns={[1, 2]}>
            <FilteredProducts products={data.products} filters={filters} />
          </Grid>
        </>
      )}
      {error && (
        <Alert variant="error">
          Error loading data. Please check if your server is up and running.
          <Close ml="auto" mr={-2} sx={{ height: "auto", width: "auto" }} />
        </Alert>
      )}
    </>
  )
}

const ProductDetails = ({ id }) => {
  const { loading, error, data } = useQuery(
    gql`
      query Product($id: ID!) {
        product(id: $id) {
          name
          id
          price
          description
        }
      }
    `,
    { variables: { id } }
  )

  return (
    <>
      {loading && <h1>Loading...</h1>}
      {data && (
        <>
          <h1>{data.product.name}</h1>
          <Alert variant="info">NOTE: The images are not optimized.</Alert>
        </>
      )}
      {error && <Alert variant="error">Error fetching product {id}</Alert>}
    </>
  )
}

const DynamicContent = () => {
  return (
    <Layout>
      <Router basepath="/content-dynamic">
        <ProductList exact path="/" />
        <ProductDetails exact path=":id" />
      </Router>
    </Layout>
  )
}

export default DynamicContent
