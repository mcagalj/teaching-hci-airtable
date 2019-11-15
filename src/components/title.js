/** @jsx jsx */
import { jsx, Styled } from "theme-ui"

const Title = ({ children, sx, ...props }) => (
  <Styled.h1
    {...props}
    sx={{
      ...sx,
      py: 0,
      // borderBottom: theme => `1px solid ${theme.colors.accent}`,
      color: "accent",
    }}
  >
    {children}
  </Styled.h1>
)
export default Title
