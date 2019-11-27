/** @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"
import { Grid, Text, Button, Card, Flex } from "@theme-ui/components"
import Img from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { useCart } from "../hooks/useCart"

const Cart = () => {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity } = useCart()
  const { products } = cart

  let subtotal = 0
  const items = Object.keys(products).length
  let productsToShow = []

  for (const id in products) {
    subtotal += products[id].data.price
    productsToShow.push(
      <Card key={id} variant="secondary">
        <Flex sx={{ justifyContent: "space-between" }}>
          <Img
            fluid={{
              ...products[id].data.image.localFiles[0].sharp.fluid,
              aspectRatio: 21 / 15,
            }}
            sx={{
              flex: 1,
              minWidth: "100px",
              maxWidth: "140px",
              maxHeight: "100px",
              marginRight: [3, 4],
            }}
          />
          <Grid
            columns={2}
            sx={{
              flex: 2,
              gridTemplate: [
                `"name price" "delete delete"`,
                `"name price" "delete -"`,
              ],
            }}
          >
            <Text sx={{ gridArea: "name", flex: 1 }}>
              {products[id].data.name}
            </Text>
            <Text
              as="h4"
              sx={{ gridArea: "price", ml: "auto", color: "accent" }}
            >
              ${products[id].data.price}
            </Text>
            <Button
              variant="secondary"
              sx={{
                gridArea: "delete",
                alignSelf: "flex-end",
                mr: "auto",
                whiteSpace: "nowrap",
                py: [0, 2],
              }}
              onClick={() => removeFromCart(id)}
            >
              &times; Delete
            </Button>
          </Grid>
        </Flex>
      </Card>
    )
  }

  return (
    <Layout>
      <SEO title="Shopping Cart" />
      <h1 sx={{ my: [3, 4] }}>Your Shopping Cart</h1>
      <Grid gap={3} column={1}>
        {items > 0 && (
          <Button variant="primary" sx={{ ml: "auto" }}>
            Proceed to checkout
          </Button>
        )}
        {productsToShow}
        {items > 0 && (
          <>
            <Card variant="secondary" sx={{ ml: "auto" }}>
              <Text sx={{ display: "inline-block", fontWeight: "medium" }}>
                Subtotal ({items} {items === 1 ? "item" : "items"}):
              </Text>
              <Text
                as="h4"
                sx={{
                  gridArea: "price",
                  display: "inline-block",
                  ml: "auto",
                  color: "accent",
                  ml: 2,
                }}
              >
                ${subtotal}
              </Text>
            </Card>
          </>
        )}
      </Grid>
    </Layout>
  )
}

export default Cart
