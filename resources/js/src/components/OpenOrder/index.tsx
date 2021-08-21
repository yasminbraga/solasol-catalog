import React from 'react'
import Card from '../Card'
import Pagination from '../Pagination'
import ProductItemOrderList from '../ProductItemOrderList'
import Results from '../Results'

import { Container } from './styles'

const OpenOrder: React.FC = () => {
  return (
    <Container>
      <Card>
        <Results />
        <ProductItemOrderList />
        <Pagination />
      </Card>
    </Container>
  )
}

export default OpenOrder
