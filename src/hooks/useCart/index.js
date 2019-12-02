import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useMemo,
} from "react"

import { reducer, initialState } from "./reducer"
import {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "./actions"

const getStorage = (key = "cart") => {
  if (typeof localStorage === "undefined") {
    return {
      getItem: () => initialState,
      setItem: () => null,
    }
  }

  return {
    getItem: (defaultValue = initialState) => {
      const value = localStorage.getItem(key)
      return value ? JSON.parse(value) : defaultValue
    },

    setItem: value => {
      const serializedValue = JSON.stringify(value)
      localStorage.setItem(key, serializedValue)
    },
  }
}

const CartContext = createContext()

export const useCart = () => {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be within CartProvider")
  }
  return context
}

export const CartProvider = ({ children }) => {
  const { getItem, setItem } = getStorage()

  const initialReducerState = getItem()
  const [cart, dispatch] = useReducer(reducer, initialReducerState)

  useEffect(() => setItem(cart), [cart])

  const value = useMemo(() => ({
    cart,
    addToCart: product => dispatch(addToCart(product)),
    removeFromCart: id => dispatch(removeFromCart(id)),
    increaseQuantity: id => dispatch(increaseQuantity(id)),
    decreaseQuantity: id => dispatch(decreaseQuantity(id)),
  }))

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

// export const _useCart = () => {
//   const { getItem, setItem } = getStorage()

//   const initialReducerState = getItem()
//   console.log("initialReducerState:", initialReducerState)
//   const [cart, dispatch] = useReducer(reducer, initialReducerState)

//   console.log("Cart:", cart)

//   useEffect(() => {
//     setItem(cart)
//   }, [cart])

//   return {
//     cart,
//     addToCart: product => dispatch(addToCart(product)),
//     removeFromCart: id => dispatch(removeFromCart(id)),
//     increaseQuantity: id => dispatch(increaseQuantity(id)),
//     decreaseQuantity: id => dispatch(decreaseQuantity(id)),
//   }
// }
