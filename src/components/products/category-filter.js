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

export default CategoryFilter
