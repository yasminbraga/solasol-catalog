import React from 'react'

import { useAppSelector } from '../../app/hooks'
import { Container } from './styles'
import ProductItem from '../ProductItem'
import Loader from '../Loader'
import Empty from '../Empty'

const ProductItemList: React.FC = () => {
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
        <ProductItem key={data.id} data={data} />
      ))}
    </Container>
  )
}

export default ProductItemList
