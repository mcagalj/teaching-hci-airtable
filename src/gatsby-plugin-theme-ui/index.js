import { tailwind } from "@theme-ui/presets"
import { keyframes } from "@emotion/core"

const placeholderTwinkle = keyframes`
  0% { opacity: 0.2 }
  50% { opacity: 0.4 }
  100% { opacity: 0.2 }
`

const theme = {
  ...tailwind,
  sizes: {
    ...tailwind.sizes,
    container: "1024px",
    logo: "44px",
    navBar: "65px",
    navLinkBorder: "3px",
  },
  colors: {
    ...tailwind.colors,
    accent: "#f50057",
    placeholder: "#a0aec0",
  },
  lineHeights: {
    ...tailwind.lineHeights,
    navLink: 3,
  },
  fontWeights: {
    ...tailwind.fontWeights,
    heading: "500",
  },
  styles: {
    ...tailwind.styles,
    blockquote: {
      borderLeft: theme => `5px solid ${theme.colors.accent}`,
      paddingLeft: 3,
      marginLeft: 0,
      marginRight: 0,
      fontStyle: "italic",
    },
    h1: {
      ...tailwind.styles.h1,
      fontSize: [4, 4, 5, 6],
      mt: [4, 5],
    },
    h2: {
      ...tailwind.styles.h2,
      fontSize: [3, 3, 4, 4],
      mt: [4, 5],
    },
    h3: {
      ...tailwind.styles.h3,
      fontSize: [2, 2, 3, 3],
      mt: 4,
    },
    h4: {
      ...tailwind.styles.h4,
      fontSize: [1, 1, 2, 2],
      mt: 4,
    },
  },
  buttons: {
    primary: { ...tailwind.buttons.primary },
    secondary: {
      cursor: "pointer",
      bg: "accent",
      borderRadius: 0,
    },
    resetFilters: {
      color: "primary",
      cursor: "pointer",
      bg: "gray.2",
      borderRadius: 0,
      "&:hover": {
        color: "primaryHover",
      },
    },
  },
  cards: {
    primary: {},

    secondary: {
      padding: 2,
      borderRadius: 0,
      boxShadow: theme => `0 0 8px ${theme.colors.muted}`,
    },

    placeholder: {
      padding: 2,
      animation: `${placeholderTwinkle} 2s ease infinite`,
      boxShadow: theme => `0 0 8px ${theme.colors.placeholder}`,
    },
  },
  badges: {
    priceTag: {
      bg: "gray.7",
      borderRadius: 3,
      fontWeight: "semibold",
    },
    outline: {
      bg: "transparent",
      borderRadius: 3,
      boxShadow: theme => `inset 0 0 0 1px ${theme.colors.textMuted}`,
      color: "textMuted",
      fontWeight: "normal",
    },
  },
  forms: {
    checkbox: {
      "input:focus ~ &": {
        color: "accent",
        bg: "transparent",
      },
    },
  },
  alerts: {
    error: {
      borderRadius: 0,
      bg: "accent",
    },
  },
  variants: {
    placeholder: {
      bg: "placeholder",
    },
  },
  shadows: {
    ...tailwind.shadows,
    header: theme =>
      `0 4px 6px ${theme.colors.indigo[1]}, 0 0 1px rgba(1,0,0,.1)`,
  },
  borders: {
    header: theme => `1px solid ${theme.colors.indigo[2]}`,
  },
}

export default theme
