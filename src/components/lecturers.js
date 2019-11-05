/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

const Lecturers = ({ ...props }) => {
  const data = useStaticQuery(graphql`
    query Lecturers {
      allMdx(
        filter: {
          fileAbsolutePath: { regex: "//content/lecturers//" }
          frontmatter: { unlisted: { ne: "true" } }
        }
        sort: { fields: frontmatter___order, order: ASC }
      ) {
        lecturers: edges {
          lecturer: node {
            id
            frontmatter {
              name
              email
              web
              image {
                childImageSharp {
                  fixed(width: 100, height: 100) {
                    ...GatsbyImageSharpFixed
                  }
                }
              }
            }
          }
        }
      }
    }
  `)

  const {
    allMdx: { lecturers },
  } = data

  return (
    <>
      {lecturers &&
        lecturers.map(({ lecturer }) => {
          return (
            <div
              key={lecturer.id}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "flex-end",
              }}
            >
              <Img
                sx={{ mb: 1 }}
                fixed={lecturer.frontmatter.image.childImageSharp.fixed}
              />
              <p sx={{ ml: 0, mr: 0, mb: 0 }}>{lecturer.frontmatter.name}</p>
              <p sx={{ m: 0 }}>
                <Styled.a href={"mailto:".concat(lecturer.frontmatter.email)}>
                  {lecturer.frontmatter.email}
                </Styled.a>
              </p>
              <p sx={{ m: 0 }}>
                <Styled.a href={"http://".concat(lecturer.frontmatter.web)}>
                  {lecturer.frontmatter.web}
                </Styled.a>
              </p>
            </div>
          )
        })}
    </>
  )
}

export default Lecturers
