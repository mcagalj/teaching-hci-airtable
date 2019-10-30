/** @jsx jsx */
import { jsx, useThemeUI, Header } from "theme-ui"
import React from "react"
import { Link } from "gatsby"

import logo from "../assets/logo.svg"
import Container from "./container"

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

const NavLink = ({ children, ...prop }) => {
  const { theme } = useThemeUI()

  return (
    <Link
      {...prop}
      sx={{
        display: "inline-block",
        px: 2,
        ml: 3,
        color: "primary",
        textDecoration: "none",
        whiteSpace: "nowrap",
        letterSpacing: "wide",
        lineHeight: theme =>
          `calc(${theme.sizes.navBar} - 2 * ${theme.sizes.navLinkBorder})`,
        borderTop: theme => `${theme.sizes.navLinkBorder} solid transparent`,
        borderBottom: theme => `${theme.sizes.navLinkBorder} solid transparent`,
        transition: "all 0.25s linear",
        "&:hover": {
          color: "primaryHover",
          borderBottom: theme =>
            `${theme.sizes.navLinkBorder} solid ${theme.colors.primaryHover}`,
        },
      }}
      activeStyle={{
        color: theme.colors.primaryHover,
        borderBottom: `${theme.sizes.navLinkBorder} solid ${theme.colors.primaryHover}`,
      }}
    >
      {children}
    </Link>
  )
}

const NavLinks = ({ menuItems }) => (
  <>
    {menuItems.map(menuItem => (
      <NavLink key={menuItem.path} to={menuItem.path}>
        {menuItem.text}
      </NavLink>
    ))}
  </>
)

const Navigation = ({ menuItems }) => {
  return (
    <Header
      sx={{
        borderBottom: theme => `1px solid ${theme.colors.indigo[2]}`,
        boxShadow: theme =>
          `0 4px 6px ${theme.colors.indigo[1]},0 0 1px rgba(1,0,0,.1)`,
      }}
    >
      <Container
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignContent: "center",
        }}
      >
        <Link to="/" sx={{ display: "flex", alignItems: "center" }}>
          <img
            src={logo}
            sx={{
              height: "logo",
              width: "auto",
            }}
          />
        </Link>
        <nav>
          <NavLinks menuItems={menuItems} />
        </nav>
      </Container>
    </Header>
  )
}

export default Navigation
