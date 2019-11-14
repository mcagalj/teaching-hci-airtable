/** @jsx jsx */
import { jsx, Styled } from "theme-ui"

const Title = ({ children, sx, ...props }) => (
  <Styled.h2
    {...props}
    sx={{
      my: [2, 4],
      py: 0,
      // borderBottom: theme => `1px solid ${theme.colors.accent}`,
      textAlign: "center",
      color: "accent",
      ...sx,
    }}
  >
    {children}
  </Styled.h2>
)
export default Title
