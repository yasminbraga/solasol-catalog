import { all } from 'redux-saga/effects'
import { watchOrderAddProduct } from './order'

export default function* rootSaga() {
  yield all([watchOrderAddProduct()])
}
