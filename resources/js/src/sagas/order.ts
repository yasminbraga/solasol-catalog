import { call, delay, put, select, takeLatest } from 'redux-saga/effects'
import { PayloadAction } from '@reduxjs/toolkit'
import api from '../services/api'
import Product from '../interfaces/Product'
import { RootState } from '../app/store'
import {
  addProductSucceeded,
  removeProductSucceeded,
  updateProductQuantitySucceeded,
} from '../features/order'

export function* watchAddProduct() {
  yield takeLatest('order/addProductRequest', addProduct)
}

// add product handler
function* addProduct(action: PayloadAction<Product>) {
  yield delay(250)

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

export function* watchUpdateProduct() {
  yield takeLatest('order/updateProductQuantityRequest', updateProduct)
}

// update product handler
function* updateProduct(action: PayloadAction<{ id: number; quantity: number }>) {
  yield delay(250)

  const order: RootState['order'] = yield select((state: RootState) => state.order)

  try {
    yield call(api.put, `/orders/${order.order.uuid}/products/${action.payload.id}`, {
      quantity: action.payload.quantity,
    })
    yield put(updateProductQuantitySucceeded(action.payload))
  } catch (error) {
    yield console.log(error)
  }
}

export function* watchRemoveProduct() {
  yield takeLatest('order/removeProductRequest', removeProduct)
}

// remove product handler
function* removeProduct(action: PayloadAction<{ id: number }>) {
  yield delay(250)

  const order: RootState['order'] = yield select((state: RootState) => state.order)

  try {
    yield call(api.delete, `/orders/${order.order.uuid}/products/${action.payload.id}`)
    yield put(removeProductSucceeded(action.payload))
  } catch (error) {
    yield console.log(error)
  }
}

// pack all sagas and export to rootSaga
export default function orderSagas() {
  return [watchAddProduct(), watchUpdateProduct(), watchRemoveProduct()]
}
