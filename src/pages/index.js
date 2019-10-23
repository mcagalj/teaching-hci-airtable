import React from "react"
import { Link } from "gatsby"

const IndexPage = () => (
  <div>
    <h1>Teaching HCI</h1>
    <h2>Examples:</h2>
    <ul>
      <li>
        <Link to="/examples/example-1">Example 1</Link>
      </li>
      <li>
        <Link to="/examples/example-2">Example 2</Link>
      </li>
      <li>
        <Link to="/examples/example-3">Example 3</Link>
      </li>
    </ul>

    <Link to="/products">
      <h2>Poducts</h2>
    </Link>

    <Link to="/blog">
      <h2>Blog</h2>
    </Link>
  </div>
)

export default IndexPage
