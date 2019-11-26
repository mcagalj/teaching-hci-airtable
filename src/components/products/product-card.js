/** @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"
import { Box, Card, Badge, Heading, Button, Flex } from "@theme-ui/components"
import { Link } from "gatsby"
import Img from "gatsby-image"
import ReactImg from "react-image"

// This component is a container (mainly for images)
// responsible for maintaining the desired
// aspect ratio.
// Default aspect ratio: 21 / 15 = 1.4
const ImageContainer = ({ children, aspectRatio = 1.4 }) => (
  <div sx={{ position: "relative", overflow: "hidden" }}>
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
        <ReactImg
          src={`${process.env.GATSBY_CMS_URL}${image.url}`}
          alt={credit}
        />
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

const ProductCard = ({
  pathPrefix = "products",
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
}) => {
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
        <Button variant="secondary">Add to cart (${price})</Button>
      </Flex>
    </Card>
  )
}

export { ProductCard as default, ImageContainer }
