/** @jsx jsx */
import { jsx, useThemeUI, Header } from "theme-ui"
import React, { useRef, useState, useLayoutEffect } from "react"
import { Link } from "gatsby"

import logo from "../assets/logo.svg"
import more from "../assets/more.svg"
import Container from "./container"
import { useResponsiveMenu, useOnOutsideEvent } from "../hooks"

const NavLink = ({ ...prop }) => (
  <Link
    {...prop}
    sx={{
      display: "inline-block",
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

const VisibleNavLink = ({ ...prop }) => {
  const { theme } = useThemeUI()

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
      }}
      activeStyle={{
        color: theme.colors.primaryHover,
        borderLeft: `${theme.sizes.navLinkBorder} solid ${theme.colors.primaryHover}`,
      }}
    />
  )
}

const MoreButton = ({ onClick, width = 50 }) => (
  <div
    sx={{
      display: "flex",
      flexShrink: 0,
      alignItems: "center",
      width,
      px: 3,
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "indigo.2",
      },
    }}
    onClick={onClick}
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

const HiddenItems = ({
  menu,
  handleOutsideClick,
  minWidth = 120,
  topOffset = 16,
}) => {
  const { innerBorderRef } = useOnOutsideEvent(handleOutsideClick)
  return (
    <div
      ref={innerBorderRef}
      sx={{
        display: "flex",
        flexDirection: "column",
        position: "absolute",
        top: menu.containerBottomOffset + topOffset,
        p: 2,
        zIndex: 100,
        minWidth,
        backgroundColor: "white",
        border: theme => theme.borders.header,
        boxShadow: theme => theme.shadows.primary,
      }}
    >
      <Triangle />
      {menu.hiddenItems.map(menuItem => (
        <HiddenNavLink key={menuItem.path} to={menuItem.path}>
          {menuItem.text}
        </HiddenNavLink>
      ))}
    </div>
  )
}

const isEmpty = array => array.length === 0
const getElementMargin = el => {
  const style = window.getComputedStyle(el)
  const leftMargin = parseInt(style.marginLeft.split("px")[0])
  const rightMargin = parseInt(style.marginLeft.split("px")[0])
  return leftMargin + rightMargin
}

// const useResponsiveMenu = ({ containerRef, menuItems }) => {
//   const [menu, setMenu] = useState({ visibleItems: menuItems, hiddenItems: [] })

//   useLayoutEffect(() => {
//     const handleResize = () => {
//       setMenu({ visibleItems: menuItems, hiddenItems: [] })

//       const { offsetWidth: containerWidth } = containerRef.current

//       // Reserve space for "More" (...) button
//       const maxWidth = containerWidth - MORE_BUTTON_WIDTH

//       const items = containerRef.current.children
//       // We assume menu items to share the same margins
//       const itemMargin = getElementMargin(items[0])

//       const { offsetWidth: lastItemWidth } = items[items.length - 1]
//       const canLastItemFit = lastItemWidth <= MORE_BUTTON_WIDTH ? true : false

//       const menuResult = Array.from(items).reduce(
//         (result, menuItem) => {
//           result.cumulativeWidth += menuItem.offsetWidth + itemMargin

//           result.cumulativeWidth < maxWidth
//             ? result.visibleItems.push({
//                 text: menuItem.text,
//                 path: menuItem.getAttribute("href"),
//               })
//             : result.hiddenItems.push({
//                 text: menuItem.text,
//                 path: menuItem.getAttribute("href"),
//               })

//           return result
//         },
//         {
//           cumulativeWidth: 0,
//           containerBottomOffset: containerRef.current.getBoundingClientRect()
//             .bottom,
//           visibleItems: [],
//           hiddenItems: [],
//         }
//       )

//       const { visibleItems, hiddenItems, containerBottomOffset } = menuResult

//       // Check can we swap the "more" button with the only hidden item
//       if (hiddenItems.length === 1 && canLastItemFit) {
//         visibleItems.push(hiddenItems.pop())
//       }

//       setMenu({ visibleItems, hiddenItems, containerBottomOffset })
//     }

//     handleResize()
//     window.addEventListener("resize", handleResize)
//     return () => {
//       window.removeEventListener("resize", handleResize)
//     }
//   }, [containerRef])

//   return { menu }
// }

const Nav = ({ menuItems }) => {
  const containerRef = useRef(null)
  // const [menu, setMenu] = useState({ visibleItems: menuItems, hiddenItems: [] })
  const [moreOpen, setMoreOpen] = useState(false)

  const handleMoreClick = () => setMoreOpen(true)
  const handleOutsideClick = () => setMoreOpen(false)

  const { menu } = useResponsiveMenu({ containerRef, menuItems })

  // useLayoutEffect(() => {
  //   const handleResize = () => {
  //     setMenu({ visibleItems: menuItems, hiddenItems: [] })

  //     const { offsetWidth: containerWidth } = containerRef.current

  //     // Reserve space for "More" (...) button
  //     const maxWidth = containerWidth - MORE_BUTTON_WIDTH

  //     const items = containerRef.current.children
  //     // We assume menu items to share the same margins
  //     const itemMargin = getElementMargin(items[0])

  //     const { offsetWidth: lastItemWidth } = items[items.length - 1]
  //     const canLastItemFit = lastItemWidth <= MORE_BUTTON_WIDTH ? true : false

  //     const menuResult = Array.from(items).reduce(
  //       (result, menuItem) => {
  //         result.cumulativeWidth += menuItem.offsetWidth + itemMargin

  //         result.cumulativeWidth < maxWidth
  //           ? result.visibleItems.push({
  //               text: menuItem.text,
  //               path: menuItem.getAttribute("href"),
  //             })
  //           : result.hiddenItems.push({
  //               text: menuItem.text,
  //               path: menuItem.getAttribute("href"),
  //             })

  //         return result
  //       },
  //       {
  //         cumulativeWidth: 0,
  //         containerBottomOffset: containerRef.current.getBoundingClientRect()
  //           .bottom,
  //         visibleItems: [],
  //         hiddenItems: [],
  //       }
  //     )

  //     const { visibleItems, hiddenItems, containerBottomOffset } = menuResult

  //     // Check can we swap the "more" button with the only hidden item
  //     if (hiddenItems.length === 1 && canLastItemFit) {
  //       visibleItems.push(hiddenItems.pop())
  //     }

  //     setMenu({ visibleItems, hiddenItems, containerBottomOffset })
  //   }

  //   handleResize()
  //   window.addEventListener("resize", handleResize)
  //   return () => {
  //     window.removeEventListener("resize", handleResize)
  //   }
  // }, [])

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
        <VisibleNavLink key={menuItem.path} to={menuItem.path}>
          {menuItem.text}
        </VisibleNavLink>
      ))}
      {!isEmpty(menu.hiddenItems) && <MoreButton onClick={handleMoreClick} />}
      {!isEmpty(menu.hiddenItems) &&
        (moreOpen && (
          <HiddenItems menu={menu} handleOutsideClick={handleOutsideClick} />
        ))}
    </nav>
  )
}

const Navigation = ({ menuItems }) => {
  return (
    <Header
      sx={{
        borderBottom: theme => theme.borders.header,
        boxShadow: theme => theme.shadows.primary,
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
