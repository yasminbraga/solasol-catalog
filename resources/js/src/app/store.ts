import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'

import orderReducer from '../features/order'
import filterReducer from '../features/filter'
import productsReducer from '../features/products'

import rootSaga from '../sagas'

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
  reducer: {
    order: orderReducer,
    filter: filterReducer,
    products: productsReducer,
  },
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), sagaMiddleware],
})

sagaMiddleware.run(rootSaga)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
