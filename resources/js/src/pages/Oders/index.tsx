import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { fetchOrder } from '../../features/order'
import { fetchProducts } from '../../features/products'

import Filter from '../../components/Filter'
import NotFound from '../../components/NotFound'
import ClosedOrder from '../../components/ClosedOrder'
import OpenOrder from '../../components/OpenOrder'
import ConfirmedOrder from '../../components/ConfirmedOrder'

const OdersPage: React.FC = () => {
  const appDispatch = useAppDispatch()
  const order = useAppSelector((state) => state.order)
  const filter = useAppSelector((state) => state.filter)

  const params = useParams<{ uuid: string }>()

  useEffect(() => {
    appDispatch(fetchOrder(params.uuid))
  }, [])

  useEffect(() => {
    appDispatch(fetchProducts(filter))
  }, [filter])

  if (!order.loading && !order.valid) {
    return (
      <NotFound
        title="Pedido inválido."
        subtitle="O pedido que você tentou acessar está indisponível ou não existe."
      />
    )
  }

  if (order.order.confirmed) {
    return <ConfirmedOrder />
  }

  if (order.order.closed) {
    return <ClosedOrder />
  }

  return (
    <React.Fragment>
      <Filter />

      <OpenOrder />
    </React.Fragment>
  )
}

export default OdersPage
