/** @jsx jsx */
import { jsx } from "theme-ui"
import { Grid, Card } from "@theme-ui/components"
import React, { useRef, useState, useMemo } from "react"
import matchSorter from "match-sorter"
import debounce from "debounce"
import Img from "gatsby-image"

import SearchIcon from "./search-icon"

// extract author names from the corresponding filenames
const getAuthor = imageBase =>
  imageBase
    .split("-")
    .slice(0, -2)
    .map(item => item.charAt(0).toUpperCase() + item.slice(1))
    .join(" ")

const FilteredGallery = ({ images = [], ...prop }) => {
  const [search, setSearch] = React.useState("")
  const inputRef = React.useRef()

  // processing photo authors (extracting author names from filenames)
  // this is a one-time job, hence useMemo hook.
  const processedImages = React.useMemo(() => {
    return images.map(({ image }) => ({
      ...image,
      author: getAuthor(image.base),
    }))
  }, [images])

  const filteredImages = matchSorter(processedImages, search, {
    keys: [
      "author",
      { key: "author", threshold: matchSorter.rankings.CONTAINS },
    ],
  })

  return (
    <>
      <div
        {...prop}
        sx={{
          display: "flex",
          paddingTop: 2,
          marginBottom: 2,
          borderBottom: theme => `1px solid ${theme.colors.indigo[2]}`,
        }}
      >
        <label
          sx={{
            position: "relative",
            marginLeft: "auto",
            width: ["100%", "auto"],
          }}
        >
          <input
            type="search"
            placeholder="Search authors"
            ref={inputRef}
            // autoFocus={true}
            onChange={debounce(() => setSearch(inputRef.current.value), 200)}
            sx={{
              py: 2,
              paddingLeft: 4,
              overflow: "hidden",
              borderWidth: 0,
              color: "text",
              fontSize: 1,
              fontWeight: "medium",
              "&:focus": {
                outline: "none",
                backgroundColor: "indigo.2",
              },
            }}
          />
          <SearchIcon
            sx={{
              fill: "primary",
              position: "absolute",
              left: "5px",
              top: "50%",
              width: 4,
              height: 4,
              pointerEvents: "none",
              transform: "translateY(-50%)",
            }}
          />
        </label>
      </div>

      <Grid gap={[4]} columns={[1, 2, null, 3]}>
        {filteredImages.map((image, index) => {
          return (
            image.author && (
              <Card key={image.id}>
                <Img
                  key={image.id}
                  fluid={{ ...image.sharp.fluid, aspectRatio: 21 / 15 }}
                />
                <p sx={{ mt: 1, mb: 0 }}>
                  by{" "}
                  <span sx={{ fontWeight: "medium", color: "accent" }}>
                    {image.author}
                  </span>
                </p>
              </Card>
            )
          )
        })}
      </Grid>
    </>
  )
}

export default FilteredGallery
