/** @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"

import SearchIcon from "./search-icon"

const FilteredGallery = ({ images, ...prop }) => {
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
    </>
  )
}

export default FilteredGallery
