import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  INCREASE_QUANTITY,
  DECREASE_QUANTITY,
} from "./actionTypes"

export const initialState = {
  productIds: [],
  products: {}, // by product ids (id_1: product_1, id_3: product_3 )
  quantity: {}, // by product ids (id_1: 4, id_3: 5 )
}

// Product details (name, price, img)
const productsReducer = (state = initialState.products, action) => {
  const {
    type,
    payload: { id, product },
  } = action

  //   const { id } = product

  switch (type) {
    case ADD_TO_CART:
      if (state[id]) {
        return state
      }

      return { ...state, [id]: product }

    case REMOVE_FROM_CART:
      if (!state[id]) {
        return state
      }

      let _state = { ...state }
      delete _state[id]
      return _state

    default:
      return state
  }
}

const productIdsReducer = (state = initialState.productIds, action) => {
  const {
    type,
    payload: { id },
  } = action

  switch (type) {
    case ADD_TO_CART:
      if (state.includes(id)) {
        return state
      }

      return [...state, id]

    case REMOVE_FROM_CART:
      return [...state].filter(item => item !== id)

    default:
      return state
  }
}

const quantityReducer = (state = initialState.quantity, action) => {
  const {
    type,
    payload: { id },
  } = action

  const quantity = state[id] || 0

  switch (type) {
    case ADD_TO_CART:
      return { ...state, [id]: quantity + 1 }

    case REMOVE_FROM_CART:
      if (!state[id]) {
        return state
      }

      let _state = { ...state }
      delete _state[id]
      return _state

    case INCREASE_QUANTITY:
      return { ...state, [id]: quantity + 1 }

    case DECREASE_QUANTITY:
      return { ...state, [id]: quantity === 1 ? 1 : quantity - 1 }

    default:
      return state
  }
}

export const reducer = (state = initalState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
    case REMOVE_FROM_CART:
    case INCREASE_QUANTITY:
    case DECREASE_QUANTITY:
      return {
        productIds: productIdsReducer(state.productIds, action),
        products: productsReducer(state.products, action),
        quantity: quantityReducer(state.quantity, action),
      }
    default:
      return store
  }
}
