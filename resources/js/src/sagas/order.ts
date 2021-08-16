import { call, delay, put, select, takeLatest } from 'redux-saga/effects'
import { PayloadAction } from '@reduxjs/toolkit'
import api from '../services/api'
import Product from '../interfaces/Product'
import { RootState } from '../app/store'
import { addProductSucceeded } from '../features/order'

export function* watchOrderAddProduct() {
  yield takeLatest('order/addProductRequest', addProduct)
}

function* addProduct(action: PayloadAction<Product>) {
  yield delay(500)

  const order: RootState['order'] = yield select((state: RootState) => state.order)

  try {
    yield call(api.post, `/orders/${order.order.uuid}/products`, {
      product: { id: action.payload.id, quantity: 1 },
    })
    yield put(addProductSucceeded(action.payload))
  } catch (error) {
    yield console.log(error)
  }
}

// export function* watchOrderUpdateProduct() {
//   yield takeLatest('order/updateProductQuantity', updateProductRequest)
// }

// export function* watchOrderRemoveProduct() {
//   // yield takeEvery('order/removeProduct', postOrderProduct)
// }

// function* updateProductRequest(action) {
//   yield delay(500)
//   yield console.log(action)
// }

// function* postOrderProduct() {
//   const order: RootState['order'] = yield select((state: RootState) => state.order)

//   const products = yield order.cart.products.map(({ id, quantity }) => ({ id, quantity }))

//   try {
//     yield call(api.post, `/orders/${order.order.uuid}/products`, { products })
//   } catch (error) {
//     yield console.log(error)
//   }
// }
