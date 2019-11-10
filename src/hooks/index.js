import { useRef, useState, useLayoutEffect, useEffect } from "react"

const useMountEffect = fun => useEffect(fun, [])
const handleKeyPress = callback => event => {
  if (event.key === "Escape" || event.keyCode === 27) {
    callback(event)
  }
}
const getElementMargin = el => {
  const style = window.getComputedStyle(el)
  const leftMargin = parseInt(style.marginLeft.split("px")[0])
  const rightMargin = parseInt(style.marginLeft.split("px")[0])
  return leftMargin + rightMargin
}

// Source: https://stackoverflow.com/a/56644506
export const useOnOutsideEvent = handleOutsideClick => {
  const innerBorderRef = useRef()

  const onClick = event => {
    if (
      innerBorderRef.current &&
      !innerBorderRef.current.contains(event.target)
    ) {
      handleOutsideClick()
    }
  }

  useMountEffect(() => {
    document.addEventListener("click", onClick, false)
    document.addEventListener("keydown", handleKeyPress(onClick))
    return () => {
      document.removeEventListener("click", onClick, false)
      document.removeEventListener("keydown", handleKeyPress(onClick))
    }
  })

  return { innerBorderRef }
}

export const useResponsiveMenu = ({
  containerRef,
  menuItems,
  spaceForMoreLink = 50,
}) => {
  const [menu, setMenu] = useState({ visibleItems: menuItems, hiddenItems: [] })

  useLayoutEffect(() => {
    const handleResize = () => {
      setMenu({ visibleItems: menuItems, hiddenItems: [] })

      const { offsetWidth: containerWidth } = containerRef.current

      // Reserve space for "More" (...) button
      const maxWidth = containerWidth - spaceForMoreLink

      const items = containerRef.current.children
      // We assume menu items to share the same margins
      const itemMargin = getElementMargin(items[0])

      const { offsetWidth: lastItemWidth } = items[items.length - 1]
      const canLastItemFit = lastItemWidth <= spaceForMoreLink ? true : false

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
          offset: containerRef.current.getBoundingClientRect().height,
          visibleItems: [],
          hiddenItems: [],
        }
      )

      const { visibleItems, hiddenItems, offset } = menuResult

      // Check can we swap the "more" button with the only hidden item
      if (hiddenItems.length === 1 && canLastItemFit) {
        visibleItems.push(hiddenItems.pop())
      }

      setMenu({ visibleItems, hiddenItems, offset })
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [containerRef])

  return { menu }
}
