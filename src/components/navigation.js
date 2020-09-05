/** @jsx jsx */
import { jsx, useThemeUI, Header } from "theme-ui"
import { useRef, useState, useEffect } from "react"
import { Link } from "gatsby"

import logo from "../assets/logo.svg"
import more from "../assets/more.svg"
import Container from "./container"
import {
  useResponsiveMenu,
  useOnOutsideEvent,
} from "../hooks/use-responsive-menu"
import { useCart } from "../hooks/useCart"

const LogoLink = () => (
  <Link to="/" sx={{ display: "flex", alignItems: "center" }}>
    <img
      src={logo}
      sx={{
        height: "logo",
        width: "auto",
      }}
    />
  </Link>
)

const NavLink = ({ ...prop }) => (
  <Link
    {...prop}
    sx={{
      display: "inline-block",
      position: "relative",
      color: "primary",
      textDecoration: "none",
      textTransform: "uppercase",
      fontWeight: "light",
      whiteSpace: "nowrap",
      letterSpacing: "tight",
      transition: "all 0.25s linear",
    }}
  />
)

const VisibleNavLink = ({ partiallyActive = false, cart = false, ...prop }) => {
  const { theme } = useThemeUI()
  const {
    cart: { products },
  } = useCart()
  const isCartAndNonempty = cart && !!Object.keys(products).length
  return (
    <NavLink
      {...prop}
      sx={{
        mx: 2,
        px: 2,
        lineHeight: theme =>
          `calc(${theme.sizes.navBar} - 2 * ${theme.sizes.navLinkBorder})`,
        borderTop: theme => `${theme.sizes.navLinkBorder} solid transparent`,
        borderBottom: theme => `${theme.sizes.navLinkBorder} solid transparent`,
        "&:hover": {
          color: "primaryHover",
          borderBottom: theme =>
            `${theme.sizes.navLinkBorder} solid ${theme.colors.primaryHover}`,
        },
        "&::after": isCartAndNonempty
          ? {
              content: `"●"`,
              color: "accent",
              fontSize: "0",
              position: "absolute",
              top: "-6px",
              right: "-6px",
            }
          : null,
      }}
      activeStyle={{
        color: theme.colors.primaryHover,
        borderBottom: `${theme.sizes.navLinkBorder} solid ${theme.colors.primaryHover}`,
      }}
      partiallyActive={partiallyActive}
    />
  )
}

const HiddenNavLink = ({ partiallyActive = false, cart = false, ...prop }) => {
  const { theme } = useThemeUI()
  const {
    cart: { products },
  } = useCart()
  const isCartAndNonempty = cart && !!Object.keys(products).length

  return (
    <NavLink
      {...prop}
      sx={{
        m: 2,
        px: 3,
        py: 2,
        borderLeft: theme => `${theme.sizes.navLinkBorder} solid transparent`,
        "&:hover": {
          color: "primaryHover",
          borderLeft: theme =>
            `${theme.sizes.navLinkBorder} solid ${theme.colors.primaryHover}`,
        },
        "&::after": isCartAndNonempty
          ? {
              content: `"(${Object.keys(products).length})"`,
              color: "accent",
              fontWeight: "light",
              fontSize: "normal",
              ml: 2,
            }
          : null,
      }}
      activeStyle={{
        color: theme.colors.primaryHover,
        borderLeft: `${theme.sizes.navLinkBorder} solid ${theme.colors.primaryHover}`,
      }}
      partiallyActive={partiallyActive}
    />
  )
}

const MoreButton = ({ onClick, open = false, width = 50 }) => {
  const {
    cart: { products },
  } = useCart()
  const isCartNonempty = !open && !!Object.keys(products).length

  return (
    <div
      sx={{
        display: "flex",
        position: "relative",
        flexShrink: 0,
        alignItems: "center",
        width,
        px: 3,
        cursor: "pointer",
        "&:hover": {
          backgroundColor: "indigo.2",
        },
        "&::after": isCartNonempty
          ? {
              content: `"●"`,
              color: "accent",
              fontSize: "0",
              position: "absolute",
              top: "5px",
              right: "5px",
            }
          : null,
      }}
      onClick={onClick}
    >
      <img
        src={more}
        sx={{
          stroke: "red",
          height: theme =>
            `calc(calc(${theme.sizes.navBar} - 2 * ${theme.sizes.navLinkBorder})/4)`,
          width: "auto",
        }}
      />
    </div>
  )
}

const Triangle = () => (
  <div
    sx={{
      position: "absolute",
      top: "-12px",
      right: "15px",
      width: "22px",
      height: "22px",
      lineHeight: 0,
      fontSize: 0,
      border: theme => theme.borders.header,
      borderWidth: "0 0 1px 1px",
      transform: "rotate(135deg)",
      backgroundColor: "white",
    }}
  />
)

const VisibleItems = ({ visibleItems }) =>
  visibleItems.map(menuItem => (
    <VisibleNavLink
      key={menuItem.path}
      to={menuItem.path}
      partiallyActive={menuItem.partiallyActive}
      cart={menuItem.cart}
    >
      {menuItem.text}
    </VisibleNavLink>
  ))

const HiddenItems = ({
  menu,
  handleOutsideClick,
  minWidth = 120,
  spaceForTriangle = 16,
  zIndex = 999,
}) => {
  const { innerBorderRef } = useOnOutsideEvent(handleOutsideClick)
  return (
    <div
      ref={innerBorderRef}
      sx={{
        display: "flex",
        flexDirection: "column",
        position: "absolute",
        top: menu.offset + spaceForTriangle,
        p: 2,
        zIndex,
        minWidth,
        backgroundColor: "white",
        border: theme => theme.borders.header,
        boxShadow: theme => theme.shadows.header,
      }}
    >
      <Triangle />
      {menu.hiddenItems.map(menuItem => (
        <HiddenNavLink
          key={menuItem.path}
          to={menuItem.path}
          partiallyActive={menuItem.partiallyActive}
          cart={menuItem.cart}
        >
          {menuItem.text}
        </HiddenNavLink>
      ))}
    </div>
  )
}

const Nav = ({ menuItems }) => {
  const containerRef = useRef(null)
  const [open, setOpen] = useState(false)
  const [visibility, setVisibility] = useState("hidden")

  const { menu } = useResponsiveMenu({ containerRef, menuItems })

  // to prevent a flash of the responsive nav bar
  // we hide it initially (using the "visibility" property)
  // until a resized version is ready to be shown
  useEffect(() => {
    setVisibility("visible")
  }, [visibility])

  const isHiddenEmpty = menu.hiddenItems.length === 0

  const handleMoreClick = () => setOpen(true)
  const handleOutsideClick = () => setOpen(false)

  return (
    <nav
      ref={containerRef}
      sx={{
        display: "flex",
        boxSizing: "border-box",
        justifyContent: "flex-end",
        flex: "auto",
        ml: [3, 4],
        overflowX: "auto",
        visibility,
      }}
    >
      <VisibleItems visibleItems={menu.visibleItems} />
      {!isHiddenEmpty && <MoreButton onClick={handleMoreClick} open={open} />}
      {!isHiddenEmpty && open && (
        <HiddenItems menu={menu} handleOutsideClick={handleOutsideClick} />
      )}
    </nav>
  )
}

const Navigation = ({ menuItems }) => {
  return (
    <Header
      sx={{
        borderBottom: theme => theme.borders.header,
        boxShadow: theme => theme.shadows.header,
        position: "relative",
      }}
    >
      <Container
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignContent: "center",
        }}
      >
        <LogoLink />
        <Nav menuItems={menuItems} />
      </Container>
    </Header>
  )
}

export default Navigation
