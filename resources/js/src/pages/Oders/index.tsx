import React, { Fragment, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'

import Card from '../../components/Card'
import Filter from '../../components/Filter'
import Pagination from '../../components/Pagination'
import NotFound from '../../components/NotFound'
import Results from '../../components/Results'
import { Container } from './styles'
import { fetchOrder } from '../../features/order'
import { fetchProducts } from '../../features/products'
import ProductItemOrderList from '../../components/ProductItemOrderList'

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

  return (
    <Fragment>
      <Filter />

      <Container>
        <Card>
          <Results />
          <ProductItemOrderList />
          <Pagination />
        </Card>
      </Container>
    </Fragment>
  )
}

export default OdersPage
