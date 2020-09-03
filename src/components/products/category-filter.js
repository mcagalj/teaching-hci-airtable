/** @jsx jsx */
import { jsx } from "theme-ui"
import {
  Box,
  Heading,
  Button,
  Flex,
  Label,
  Checkbox,
} from "@theme-ui/components"
import { useMemo } from "react"

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
      <Flex sx={{ flexWrap: "wrap", maxWidth: "600px" }}>
        {categories.map(({ category }) => {
          const {
            id: categoryId,
            data: { name: categoryName },
          } = category

          const checked = useMemo(() => filters.includes(categoryName), [
            filters,
          ])

          return (
            <Box key={categoryId} sx={{ mr: 4, mb: [1, 0, 0], width: "150px" }}>
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
                  onChange={() => handleFilterClick(categoryName)}
                />
                <span>{categoryName}</span>
              </Label>
            </Box>
          )
        })}
      </Flex>
    </Flex>
  )
}

export default CategoryFilter
