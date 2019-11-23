/** @jsx jsx */
import { jsx } from "theme-ui"
import { Card, Badge, Heading, Button, Flex } from "@theme-ui/components"
import { Link } from "gatsby"
import Img from "gatsby-image"

const ProductCard = ({
  pathPrefix = "products",
  name,
  price,
  id,
  credited_image: [{ credit, image }],
  categories,
}) => (
  <Card key={id} variant="secondary">
    <div sx={{ position: "relative" }}>
      <Link
        to={`/${pathPrefix}/${id}`}
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
        {credit}
      </p>
    </div>

    <Heading sx={{ my: 2 }}>{name}</Heading>
    <Flex sx={{ justifyContent: "space-between", alignItems: "flex-end" }}>
      {categories.map(({ name, id }) => (
        <Badge key={id} variant="outline">
          {name}
        </Badge>
      ))}
      <Button variant="secondary">Add to cart (${price})</Button>
    </Flex>
  </Card>
)

export default ProductCard
