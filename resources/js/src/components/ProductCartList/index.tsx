import React from 'react'
import { useSelector } from 'react-redux'

import ProductCart from '../ProductCart'
import { selectOrder } from '../../features/order'
import EmptyCart from '../EmptyCart'

const ProductCartList: React.FC = () => {
  const order = useSelector(selectOrder)

  if (order.cart.products.length === 0) {
    return <EmptyCart />
  }

  return (
    <React.Fragment>
      {order.cart.products.map((item) => (
        <ProductCart key={item.id} data={item} />
      ))}
    </React.Fragment>
  )
}

export default ProductCartList
