import React from "react"
import { CartProvider } from "./src/hooks/useCart"
import "prismjs/themes/prism-solarizedlight.css"
import "prismjs/plugins/line-numbers/prism-line-numbers.css"
import "./src/styles/prism/numbering-fix.css"
import "./src/styles/prism/line-highlighting.css"

export const wrapRootElement = ({ element }) => (
  <CartProvider>{element}</CartProvider>
)
