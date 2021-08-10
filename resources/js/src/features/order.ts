import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RootState } from '../app/store'

import Product from '../interfaces/Product'

interface CartProduct extends Product {
  quantity: number
}

interface OrderState {
  cart: {
    products: CartProduct[]
    totalQuantity: number
  }
}

const initialState: OrderState = {
  cart: {
    products: [],
    totalQuantity: 0,
  },
}

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      state.cart.products.push({ quantity: 1, ...action.payload })
      state.cart.totalQuantity += 1
    },
    updateProductQuantity: (
      state,
      { payload: { id, quantity } }: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const productIndex = state.cart.products.findIndex((product) => product.id === id)
      if (productIndex < 0) return

      state.cart.totalQuantity -= state.cart.products[productIndex].quantity

      if (quantity === 0) {
        state.cart.products.splice(productIndex, 1)

        return
      }

      state.cart.products[productIndex].quantity = quantity
      state.cart.totalQuantity += state.cart.products[productIndex].quantity
    },

    removeProduct: () => {},
  },
})

export const { addProduct, updateProductQuantity, removeProduct } = orderSlice.actions

export const selectOrder = (state: RootState) => state.order

export default orderSlice.reducer
