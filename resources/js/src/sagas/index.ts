import { all } from 'redux-saga/effects'
import orderSagas from './order'

export default function* rootSaga() {
  yield all([...orderSagas()])
}
