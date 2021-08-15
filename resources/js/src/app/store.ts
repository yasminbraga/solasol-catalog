import { configureStore } from '@reduxjs/toolkit'

import orderReducer from '../features/order'
import filterReducer from '../features/filter'
import productsReducer from '../features/products'

export const store = configureStore({
  reducer: {
    order: orderReducer,
    filter: filterReducer,
    products: productsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
