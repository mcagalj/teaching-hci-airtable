import React from "react"
import { Link } from "gatsby"

import Layout from "../components/Layout"

const IndexPage = () => (
  <Layout>
    <h1>Teaching HCI</h1>
    <ul>
      <li>
        <Link to="/predavanja">Predavanja</Link>
      </li>
      <li>
        <Link to="/projekti">Projekti</Link>
      </li>
      <li>
        <Link to="/blog">Blog</Link>
      </li>
    </ul>
  </Layout>
)

export default IndexPage
