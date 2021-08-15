import React from 'react'

import { useAppSelector } from '../../app/hooks'
import { Container } from './styles'
import Loader from '../Loader'
import Empty from '../Empty'
import ProductItemOrder from '../ProductItemOrder'

const ProductItemOrderList: React.FC = () => {
  const products = useAppSelector((state) => state.products)

  if (products.loading) {
    return <Loader />
  }

  if (!products.data.length) {
    return <Empty title="Nenhum produto encontrado." />
  }

  return (
    <Container>
      {products.data.map((data) => (
        <ProductItemOrder key={data.id} data={data} />
      ))}
    </Container>
  )
}

export default ProductItemOrderList
