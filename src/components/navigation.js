/** @jsx jsx */
import { jsx, Styled, Header } from "theme-ui"
import { Link } from "gatsby"

import logo from "../images/logo.svg"

// const menuItems = [
//   {
//     text: "Naslovna",
//     path: "/",
//   },
//   {
//     text: "Predavanja",
//     path: "/predavanja",
//   },
//   {
//     text: "Projekti",
//     path: "/projekti",
//   },
//   {
//     text: "Rezultati",
//     path: "/rezultati",
//   },
//   {
//     text: "Ocjenjivanje",
//     path: "/ocjenjivanje",
//   },
//   {
//     text: "Blog",
//     path: "/blog",
//   },
//   {
//     text: "Q&A",
//     path: "/questions",
//   },
// ]

// const NavLink = ({ children, ...prop }) => (
//   <Styled.a as={Link} {...prop}>
//     {children}
//   </Styled.a>
// )

const Navigation = ({ menuItems }) => {
  return (
    <Header>
      <Styled.a as={Link} to="/">
        <img
          src={logo}
          sx={{
            height: "logo",
            width: "auto",
          }}
        />
      </Styled.a>
      <nav>
        {menuItems.map(menuItem => (
          <Styled.a as={Link} key={menuItem.path} to={menuItem.path}>
            {menuItem.text}
          </Styled.a>
        ))}
      </nav>
    </Header>
  )
}

export default Navigation
