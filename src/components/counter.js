/* eslint-disable quotes */
// import styled from "@emotion/styled";
/** @jsx jsx */
import { jsx } from "theme-ui"

// const Counter = styled.div(props => ({
//   counterReset: "counter",
//   paddingLeft: `calc(${props.width} + ${props.rightMargin})`,

//   [props.countingElement]: {
//     position: "relative",
//   },

//   [`${props.countingElement}::before`]: {
//     position: "absolute",
//     width: props.width,
//     height: props.width,
//     left: `calc(-1*${props.width} - ${props.rightMargin})`,
//     textAlign: "right",
//     counterIncrement: "counter",
//     content: `counter(counter)`,
//     ...props.counterStyle,
//   },
//   ...props.childrenStyle,
// }));

const Counter = ({ children, sx, ...props }) => (
  <div
    sx={{
      counterReset: "counter",
      paddingLeft: `calc(${props.width} + ${props.rightMargin})`,

      [props.countingElement]: {
        position: "relative",
      },

      [`${props.countingElement}::before`]: {
        position: "absolute",
        display: "block",
        width: props.width,
        height: props.width,
        left: `calc(-1*${props.width} - ${props.rightMargin})`,
        counterIncrement: "counter",
        content: `counter(counter)`,
        textAlign: "right",
        ...props.counterStyle,
      },
      ...props.restStyle,
    }}
  >
    {children}
  </div>
)

export default Counter
