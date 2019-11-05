/** @jsx jsx */
import { jsx, Styled, Footer as ThemeFooter } from "theme-ui"

import Container from "./container"
import { GitHub, Gatsby } from "./icons"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <ThemeFooter
      sx={{
        bg: "blue.9",
        mt: 4,
        pt: [2, 2, 3],
        pb: 2,
        color: "white",
      }}
    >
      <Container>
        <div
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h2
            sx={{
              fontWeight: "normal",
            }}
          >
            HCI@FESB
          </h2>
          <div sx={{ display: "flex" }}>
            <GitHub />
            <div sx={{ mx: 2 }} />
            <Gatsby />
          </div>
        </div>
        <Styled.blockquote>
          Now you not only know how to build a web page, but also how to design
          it.
        </Styled.blockquote>
        <p sx={{ mt: 4 }}> Mario Čagalj © {currentYear} FESB</p>
      </Container>
    </ThemeFooter>
  )
}

export default Footer
