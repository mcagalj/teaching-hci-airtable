/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import {
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
import React, { useState, useRef, useMemo } from "react"
import { graphql, Link } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"

const CategoryFilter = ({ categories, filters, setFilters }) => {
  const handleFilterClick = name =>
    setFilters(filters =>
      filters.includes(name)
        ? filters.filter(item => item !== name)
        : [...filters, name]
    )

  return (
    <Flex sx={{ flexDirection: "column", alignItems: "flex-start", mb: 4 }}>
      <Button
        variant="resetFilters"
        sx={{
          mb: 3,
          py: 1,
          visibility: filters.length === 0 ? "hidden" : "visible",
        }}
        onClick={() => setFilters([])}
      >
        &times; Clear Filters
      </Button>

      <Heading
        as="h3"
        sx={{ mb: 2, color: "textMuted", textTransform: "uppercase" }}
      >
        Category
      </Heading>
      <Flex>
        {categories.map(category => {
          const checked = useMemo(() => filters.includes(category.name), [
            filters,
          ])

          return (
            <Box key={category.id} sx={{ mr: 4 }}>
              <Label
                sx={{
                  // Somewhat an ugly hack
                  "&:hover *": {
                    color: "accent",
                    cursor: "pointer",
                  },
                  "& *": {
                    color: checked ? "accent" : "textMuted",
                  },
                }}
              >
                <Checkbox
                  checked={checked}
                  onChange={() => handleFilterClick(category.name)}
                />
                <span>{category.name}</span>
              </Label>
            </Box>
          )
        })}
      </Flex>
    </Flex>
  )
}

const FilteredProducts = ({ products, filters }) => (
  <>
    {products.map(({ product }, index) => {
      const { id, categories, credited_image } = product

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
            : productCategories.some(productCategory =>
                filters.includes(productCategory)
              ),
        [filters]
      )

      if (!filterHit) return null

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
                  filter: "opacity(0.5)",
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
            <Button variant="secondary">Add to cart (${product.price})</Button>
          </Flex>
        </Card>
      )
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
