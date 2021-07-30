import React from 'react'

import { Container, ProductImage, ProductContent, ProductName, ProductPrice } from './styles'

interface DataProps {
  file?: { fileNameUrl: string }
  price: number
  name: string
}

interface ProductItemProps {
  data: DataProps
}

const ProductItem: React.FC<ProductItemProps> = ({ data }) => {
  return (
    <Container>
      <ProductImage src={data.file?.fileNameUrl} alt={data.name} />

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
