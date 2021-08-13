import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../app/store'
import Product, { ProductCart } from '../interfaces/Product'

interface OrderState {
  cart: {
    products: ProductCart[]
    totalQuantity: number
    totalPrice: number
  }
}

const initialState: OrderState = {
  cart: {
    products: [],
    totalQuantity: 0,
    totalPrice: 0,
  },
}

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addProduct: (state, { payload }: PayloadAction<Product>) => {
      const productPresent = state.cart.products.find((product) => payload.id === product.id)
      if (productPresent) return

      state.cart.products.push({ quantity: 1, ...payload })
      state.cart.totalQuantity += 1
      state.cart.totalPrice += +payload.price
    },
    updateProductQuantity: (
      state,
      { payload: { id, quantity } }: PayloadAction<{ id: number; quantity: number }>
    ) => {
      if (quantity < 0) return
      const productIndex = state.cart.products.findIndex((product) => product.id === id)
      if (productIndex < 0) return
      const product = state.cart.products[productIndex]

      state.cart.totalQuantity -= product.quantity
      state.cart.totalPrice -= product.quantity * product.price

      if (quantity === 0) {
        state.cart.products.splice(productIndex, 1)
        return
      }

      state.cart.products[productIndex].quantity = quantity
      state.cart.totalQuantity += product.quantity
      state.cart.totalPrice += product.quantity * product.price
    },
    removeProduct: (state, { payload: { id } }: PayloadAction<{ id: number }>) => {
      const productIndex = state.cart.products.findIndex((product) => product.id === id)
      const product = state.cart.products[productIndex]

      state.cart.totalQuantity -= product.quantity
      state.cart.totalPrice -= product.price * product.quantity
      state.cart.products.splice(productIndex, 1)
    },
  },
})

export const { addProduct, updateProductQuantity, removeProduct } = orderSlice.actions

export const selectOrder = (state: RootState) => state.order

export default orderSlice.reducer
