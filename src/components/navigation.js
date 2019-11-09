/** @jsx jsx */
import { jsx, useThemeUI, Header } from "theme-ui"
import React, { useRef, useState, useLayoutEffect } from "react"
import { Link } from "gatsby"

import logo from "../assets/logo.svg"
import more from "../assets/more.svg"
import Container from "./container"

const NavLink = ({ ...prop }) => {
  const { theme } = useThemeUI()

  return (
    <Link
      {...prop}
      sx={{
        display: "inline-block",
        px: 2,
        mx: 2,
        color: "primary",
        textDecoration: "none",
        textTransform: "uppercase",
        fontWeight: "light",
        whiteSpace: "nowrap",
        letterSpacing: "tight",
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
    />
  )
}

const HiddenNavLink = ({ ...prop }) => {
  const { theme } = useThemeUI()

  return (
    <Link
      {...prop}
      sx={{
        display: "inline-block",
        p: 2,
        m: 2,
        color: "primary",
        textDecoration: "none",
        textTransform: "uppercase",
        fontWeight: "light",
        whiteSpace: "nowrap",
        letterSpacing: "tight",
        borderLeft: theme => `${theme.sizes.navLinkBorder} solid transparent`,
        transition: "all 0.25s linear",
        "&:hover": {
          color: "primaryHover",
          borderLeft: theme =>
            `${theme.sizes.navLinkBorder} solid ${theme.colors.primaryHover}`,
        },
      }}
      activeStyle={{
        color: theme.colors.primaryHover,
        borderLeft: `${theme.sizes.navLinkBorder} solid ${theme.colors.primaryHover}`,
      }}
    />
  )
}

const MORE_BUTTON_WIDTH = 50
const MoreButton = () => (
  <div
    sx={{
      display: "flex",
      flexShrink: 0,
      alignItems: "center",
      px: 3,
      width: MORE_BUTTON_WIDTH,
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "indigo.2",
      },
    }}
  >
    <img
      src={more}
      sx={{
        height: theme =>
          `calc(calc(${theme.sizes.navBar} - 2 * ${theme.sizes.navLinkBorder})/4)`,
        width: "auto",
      }}
    />
  </div>
)

const isEmpty = array => array.length === 0
const getElementMargin = el => {
  const style = window.getComputedStyle(el)
  const leftMargin = parseInt(style.marginLeft.split("px")[0])
  const rightMargin = parseInt(style.marginLeft.split("px")[0])
  return leftMargin + rightMargin
}

const Nav = ({ menuItems }) => {
  const containerRef = useRef(null)
  const [menu, setMenu] = useState({ visibleItems: menuItems, hiddenItems: [] })

  useLayoutEffect(() => {
    const handleResize = () => {
      setMenu({ visibleItems: menuItems, hiddenItems: [] })

      const { offsetWidth: containerWidth } = containerRef.current

      // Reserve some space for "More" (...) button
      const maxWidth = containerWidth - MORE_BUTTON_WIDTH

      const items = containerRef.current.children
      // We assume menu items to share the same margins
      const itemMargin = getElementMargin(items[0])

      const { offsetWidth: lastItemWidth } = items[items.length - 1]
      const canLastItemFit = lastItemWidth <= MORE_BUTTON_WIDTH ? true : false

      const menuResult = Array.from(items).reduce(
        (result, menuItem) => {
          result.cumulativeWidth += menuItem.offsetWidth + itemMargin

          result.cumulativeWidth < maxWidth
            ? result.visibleItems.push({
                text: menuItem.text,
                path: menuItem.getAttribute("href"),
              })
            : result.hiddenItems.push({
                text: menuItem.text,
                path: menuItem.getAttribute("href"),
              })

          return result
        },
        {
          cumulativeWidth: 0,
          containerBottomOffset: containerRef.current.getBoundingClientRect()
            .bottom,
          visibleItems: [],
          hiddenItems: [],
        }
      )

      const { visibleItems, hiddenItems, containerBottomOffset } = menuResult

      // Check can we swap the "more" button with the only hidden item
      if (hiddenItems.length === 1 && canLastItemFit) {
        visibleItems.push(hiddenItems.pop())
      }

      setMenu({ visibleItems, hiddenItems, containerBottomOffset })
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

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
      }}
    >
      {menu.visibleItems.map(menuItem => (
        <NavLink key={menuItem.path} to={menuItem.path}>
          {menuItem.text}
        </NavLink>
      ))}
      {!isEmpty(menu.hiddenItems) && <MoreButton />}
      {!isEmpty(menu.hiddenItems) && (
        <div
          sx={{
            display: "flex",
            flexDirection: "column",

            position: "absolute",
            top: menu.containerBottomOffset + 16,
            p: 2,
            zIndex: 100,
            minWidth: "120px",
            backgroundColor: "white",
            border: theme => `1px solid ${theme.colors.indigo[2]}`,
            // borderTop: `1px solid transparent`,
            boxShadow: theme =>
              `0 4px 6px ${theme.colors.indigo[1]},0 0 1px rgba(1,0,0,.1)`,
          }}
        >
          {menu.hiddenItems.map(menuItem => (
            <HiddenNavLink key={menuItem.path} to={menuItem.path}>
              {menuItem.text}
            </HiddenNavLink>
          ))}
          <div
            sx={{
              position: "absolute",
              top: "-12px",
              right: "15px",
              width: "22px",
              height: "22px",
              lineHeight: 0,
              fontSize: 0,
              border: theme => `1px solid ${theme.colors.indigo[2]}`,
              borderWidth: "0 0 1px 1px",
              transform: "rotate(135deg)",
              backgroundColor: "white",
            }}
          />
        </div>
      )}
    </nav>
  )
}

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
        <Nav menuItems={menuItems} />
      </Container>
    </Header>
  )
}

export default Navigation
