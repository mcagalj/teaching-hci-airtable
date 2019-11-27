/** @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"
import { Box, Card, Badge, Heading, Button, Flex } from "@theme-ui/components"
import { Link } from "gatsby"
import Img from "gatsby-image"
import ReactImg from "react-image"

import { useCart } from "../../hooks/useCart"

// This component is a container (mainly for images)
// responsible for maintaining the desired
// aspect ratio.
// Default aspect ratio: 21 / 15 = 1.4
const ImageContainer = ({ children, aspectRatio = 1.4, ...props }) => (
  <div sx={{ position: "relative", overflow: "hidden" }} {...props}>
    <div
      sx={{
        width: "100%",
        paddingBottom: `${100 / aspectRatio}%`,
      }}
    />
    {React.isValidElement(children)
      ? React.cloneElement(children, {
          style: {
            position: "absolute",
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
            objectFit: "cover",
            objectPosition: "center center",
          },
        })
      : null}
  </div>
)

const ProductImage = ({ image, credit = "" }) => {
  if (image) {
    return image.sharp ? (
      <Img
        fluid={{
          ...image.sharp.fluid,
          aspectRatio: 21 / 15,
        }}
      />
    ) : (
      <ImageContainer>
        <ReactImg src={`${image.url}`} alt={credit} />
      </ImageContainer>
    )
  }

  return (
    <ImageContainer>
      <Box
        bg="warning"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "accent",
        }}
      >
        Missing image
      </Box>
    </ImageContainer>
  )
}

export const CartButton = ({ product, ...props }) => {
  const { cart, addToCart, removeFromCart } = useCart()
  const { id } = product
  const alreadyInCart = cart.products[id] ? true : false

  return alreadyInCart ? (
    <Button {...props} variant="secondary" onClick={() => removeFromCart(id)}>
      &times; Remove from cart
    </Button>
  ) : (
    <Button {...props} variant="primary" onClick={() => addToCart(product)}>
      + Add to cart
    </Button>
  )
}

const ProductCard = ({ pathPrefix = "products", product }) => {
  const {
    id,
    data: {
      name,
      price,
      image: {
        localFiles: [image],
      },
      image_credit,
      categories,
    },
  } = product

  return (
    <Card key={id} variant="secondary">
      <div sx={{ position: "relative" }}>
        <Link
          to={`/${pathPrefix}/${id}`}
          sx={{
            "&:hover img": {
              filter: "brightness(0.9)",
              transition: "all 0.25s ease-in-out !important",
            },
          }}
        >
          <ProductImage image={image} credit={image_credit} />
        </Link>
        <Badge
          variant="priceTag"
          sx={{
            position: "absolute",
            top: 1,
            left: 1,
          }}
        >
          ${price}
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
          {image_credit}
        </p>
      </div>

      <Heading sx={{ my: 2 }}>{name}</Heading>
      <Flex sx={{ justifyContent: "space-between", alignItems: "flex-end" }}>
        {categories.map(category => (
          <Badge key={category} variant="outline">
            {category}
          </Badge>
        ))}
        <CartButton product={product} />
      </Flex>
    </Card>
  )
}

export { ProductCard as default, ImageContainer }
