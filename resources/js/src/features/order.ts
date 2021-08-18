import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../app/store'
import Order, { OrderResponse } from '../interfaces/Order'
import Product, { ProductCart } from '../interfaces/Product'
import api from '../services/api'

interface OrderState {
  cart: {
    products: ProductCart[]
  }
  order: Order
  valid: boolean
  loading: boolean
}

const initialState: OrderState = {
  cart: {
    products: [],
  },
  order: {} as Order,
  loading: true,
  valid: false,
}

export const fetchOrder = createAsyncThunk('order/fecthOrder', async (uuid: string) => {
  const response = await api.get<OrderResponse>(`/orders/${uuid}`)

  return response.data.order
})

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addProductRequest: (state, { payload }: PayloadAction<Product>) => {
      const productPresent = state.cart.products.find((product) => payload.id === product.id)
      if (productPresent) return

      state.cart.products.push({ quantity: 1, ...payload, loading: true })
    },
    addProductSucceeded: (state, { payload }: PayloadAction<Product>) => {
      const productIndex = state.cart.products.findIndex((product) => payload.id === product.id)
      if (productIndex < 0) return

      state.cart.products[productIndex].loading = false
    },
    updateProductQuantityRequest: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      if (action.payload.quantity <= 0) return
      const productIndex = state.cart.products.findIndex(
        (product) => product.id === action.payload.id
      )
      if (productIndex < 0) return

      state.cart.products[productIndex].loading = true
    },
    updateProductQuantitySucceeded: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const productIndex = state.cart.products.findIndex(
        (product) => product.id === action.payload.id
      )
      if (productIndex < 0) return

      state.cart.products[productIndex].quantity = action.payload.quantity
      state.cart.products[productIndex].loading = false
    },
    removeProductRequest: (state, action) => {
      const productIndex = state.cart.products.findIndex(
        (product) => product.id === action.payload.id
      )
      state.cart.products[productIndex].loading = true
    },
    removeProductSucceeded: (state, action: PayloadAction<{ id: number }>) => {
      const productIndex = state.cart.products.findIndex(
        (product) => product.id === action.payload.id
      )

      state.cart.products.splice(productIndex, 1)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrder.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.order = action.payload
        state.valid = true
        state.loading = false

        if (action.payload.products?.length) {
          state.cart.products = action.payload.products
        }
      })
      .addCase(fetchOrder.rejected, (state) => {
        state.loading = false
      })
  },
})

export const {
  addProductRequest,
  addProductSucceeded,
  updateProductQuantityRequest,
  updateProductQuantitySucceeded,
  removeProductRequest,
  removeProductSucceeded,
} = orderSlice.actions

export const selectOrder = (state: RootState) => state.order

export const selectTotalQuantity = (state: RootState) => {
  if (!state.order.cart.products.length) return 0

  return state.order.cart.products
    .map(({ quantity }) => quantity)
    .reduce((pv, pc) => {
      return pv + pc
    })
}

export const selectTotalPrice = (state: RootState) => {
  if (!state.order.cart.products.length) return 0

  return state.order.cart.products
    .map(({ quantity, price }) => quantity * price)
    .reduce((pv, pc) => {
      return pv + pc
    })
}

export default orderSlice.reducer
