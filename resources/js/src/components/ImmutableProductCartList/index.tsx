import React from 'react'
import { useSelector } from 'react-redux'

import ImmutableProductCart from '../ImmutableProductCart'
import EmptyCart from '../EmptyCart'
import { selectOrder } from '../../features/order'

const ImmutableProductCartList: React.FC = () => {
  const order = useSelector(selectOrder)

  if (order.cart.products.length === 0) {
    return <EmptyCart />
  }

  return (
    <React.Fragment>
      {order.cart.products.map((item) => (
        <ImmutableProductCart key={item.id} data={item} />
      ))}
    </React.Fragment>
  )
}

export default ImmutableProductCartList
