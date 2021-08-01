import React from 'react'
import Product from '../../interfaces/Product'

import { Container, ProductImage, ProductContent, ProductName, ProductPrice } from './styles'

interface ProductItemProps {
  data: Product
}

const ProductItem: React.FC<ProductItemProps> = ({ data }) => {
  return (
    <Container>
      <ProductImage src={data.file?.secure_url} alt={data.name} />

      <ProductContent>
        <ProductName title={data.name}>{data.name}</ProductName>
        <ProductPrice>
          {Number(data.price).toLocaleString('pt-BR', { currency: 'BRL', style: 'currency' })}
        </ProductPrice>
      </ProductContent>
    </Container>
  )
}

export default ProductItem
