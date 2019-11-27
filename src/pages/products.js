/** @jsx jsx */
import { jsx } from "theme-ui"
import { Grid } from "@theme-ui/components"
import React, { useState, useMemo } from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { ProductCard, CategoryFilter } from "../components/products"

const FilteredProducts = ({ products, categories }) => {
  const [filters, setFilters] = useState([])

  return (
    <>
      <CategoryFilter
        categories={categories}
        filters={filters}
        setFilters={setFilters}
      />

      <Grid gap={[4, 4, 4, 5]} columns={[1, 2]}>
        {products.map(({ product }) => {
          const { id, data } = product
          const { categories } = data

          const filterHit = useMemo(
            () =>
              filters.length === 0
                ? true
                : categories.some(category => filters.includes(category)),
            [filters]
          )

          return filterHit ? (
            <ProductCard key={id} {...product} product={product} />
          ) : null
        })}
      </Grid>
    </>
  )
}

const Products = ({ data: { productsTable, categoriesTable } }) => {
  const { products } = productsTable
  const { categories } = categoriesTable

  return (
    <Layout>
      <SEO title="Products" />
      <h1 sx={{ my: [3, 4] }}>Products (statically sourced from Airtable)</h1>

      <FilteredProducts products={products} categories={categories} />
    </Layout>
  )
}

export default Products

export const query = graphql`
  query AirtableProductsQuery {
    productsTable: allAirtable(filter: { table: { eq: "Products" } }) {
      products: edges {
        product: node {
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
            categories
          }
        }
      }
    }
    categoriesTable: allAirtable(filter: { table: { eq: "Categories" } }) {
      categories: edges {
        category: node {
          id: recordId
          data {
            name
          }
        }
      }
    }
  }
`
