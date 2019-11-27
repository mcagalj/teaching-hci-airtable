import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  INCREASE_QUANTITY,
  DECREASE_QUANTITY,
} from "./actionTypes"

export const addToCart = product => ({
  type: ADD_TO_CART,
  payload: { id: product.id, product },
})

export const removeFromCart = id => ({
  type: REMOVE_FROM_CART,
  payload: { id },
})

export const increaseQuantity = id => ({
  type: INCREASE_QUANTITY,
  payload: { id },
})

export const decreaseQuantity = id => ({
  type: DECREASE_QUANTITY,
  payload: { id },
})
