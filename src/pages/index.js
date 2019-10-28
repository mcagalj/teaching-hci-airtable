/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import { Link } from "gatsby"

import Layout from "../components/layout"

const IndexPage = () => (
  <Layout>
    <Styled.h1
      sx={{
        fontSize: [4, 5, 6],
        fontWeight: "medium",
      }}
    >
      Teaching HCI
    </Styled.h1>
    <ul>
      <li>
        <Styled.a as={Link} to="/predavanja">
          Predavanja
        </Styled.a>
      </li>
      <li>
        <Styled.a as={Link} to="/projekti">
          Projekti
        </Styled.a>
      </li>
      <li>
        <Styled.a as={Link} to="/blog">
          Blog
        </Styled.a>
      </li>
    </ul>
  </Layout>
)

export default IndexPage
