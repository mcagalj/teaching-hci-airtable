import ApolloClient from "apollo-boost"
import { ApolloProvider } from "@apollo/react-hooks"

// import "./src/styles/prism/prism-monokai.css"
// import "prismjs/themes/prism-okaidia.css"
import "prismjs/themes/prism-solarizedlight.css"
import "prismjs/plugins/line-numbers/prism-line-numbers.css"
import "./src/styles/prism/numbering-fix.css"
import "./src/styles/prism/line-highlighting.css"

const client = new ApolloClient({
  uri: "http://localhost:1337/graphql",
})

export const wrapRootElement = ({ element }) => {
  return <ApolloProvider client={client}>{element}</ApolloProvider>
}
