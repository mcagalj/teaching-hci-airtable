/** @jsx jsx */
import { jsx } from "theme-ui"
import { Grid } from "@theme-ui/components"
import React, { useState, useMemo } from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { ProductCard, CategoryFilter } from "../components/products"

const FilteredProducts = ({ products, filters }) => (
  <>
    {products.map(({ product }, index) => {
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

      return filterHit ? <ProductCard key={id} {...product} /> : null
    })}
  </>
)

const Products = ({ data: { allStrapiProduct, allStrapiCategory } }) => {
  const { products } = allStrapiProduct
  const { categories } = allStrapiCategory

  const [filters, setFilters] = useState([])

  return (
    <Layout>
      <SEO title="Products" />
      <h1 sx={{ my: [3, 4] }}>Products (statically sourced from Strapi)</h1>

      <CategoryFilter
        categories={categories}
        filters={filters}
        setFilters={setFilters}
      />

      <Grid gap={[5]} columns={[1, 2]}>
        <FilteredProducts products={products} filters={filters} />
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

    allStrapiCategory {
      categories: nodes {
        name
        id
      }
    }
  }
`
