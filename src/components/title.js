/** @jsx jsx */
import { jsx, Styled } from "theme-ui"

const Title = ({ children, sx, ...props }) => (
  <Styled.h2
    {...props}
    sx={{
      paddingBottom: [2],
      borderBottom: theme => `1px solid ${theme.colors.muted}`,
      color: "indigo.6",
      ...sx,
    }}
  >
    {children}
  </Styled.h2>
)
export default Title
