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

const CategoryFilter = ({ categories, filter, setFilter }) => {
  const handleFilterClick = name =>
    setFilter(filterList =>
      filterList.includes(name)
        ? filterList.filter(item => item !== name)
        : [...filterList, name]
    )

  return (
    <Flex sx={{ flexDirection: "column", mb: 4 }}>
      <Heading
        as="h3"
        sx={{ mb: 2, color: "textMuted", textTransform: "uppercase" }}
      >
        Category
      </Heading>
      <Flex>
        {categories.map(category => (
          <Box key={category.id} sx={{ mr: 4 }}>
            <Label
              sx={{
                // Somewhat an ugly hack
                "&:hover *": {
                  color: "accent",
                  cursor: "pointer",
                },
                "& *": {
                  color: filter.includes(category.name)
                    ? "accent"
                    : "textMuted",
                },
              }}
              onChange={() => handleFilterClick(category.name)}
            >
              <Checkbox defaultChecked={false} />
              <span>{category.name}</span>
            </Label>
          </Box>
        ))}
      </Flex>
    </Flex>
  )
}

const FilteredProducts = ({ products, filter }) => (
  <>
    {products.map(({ product }, index) => {
      const { id, categories, credited_image } = product

      // processing categories (extracting category names)
      // this is a one-time job, hence useMemo hook.
      const productCategories = React.useMemo(
        () => categories.map(({ name }) => name),
        [categories]
      )

      const filterHit = React.useMemo(
        () =>
          filter.length === 0
            ? true
            : productCategories.some(productCategory =>
                filter.includes(productCategory)
              ),
        [filter]
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

  const [filter, setFilter] = useState([])

  return (
    <Layout>
      <SEO title="Products" />
      <h1 sx={{ my: [3, 4] }}>Products (statically sourced from Strapi)</h1>

      <CategoryFilter
        categories={categories}
        filter={filter}
        setFilter={setFilter}
      />

      <Grid gap={[5]} columns={[1, 2]}>
        <FilteredProducts products={products} filter={filter} />
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
