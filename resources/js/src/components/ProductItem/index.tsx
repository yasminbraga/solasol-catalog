import React from 'react'

import { Container, Img, ProductContent, ProductName, ProductPrice } from './styles'

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
      <Img src={data.file?.fileNameUrl} alt={data.name} />

      <ProductContent>
        <ProductName>{data.name}</ProductName>
        <ProductPrice>
          {Number(data.price).toLocaleString('pt-BR', { currency: 'BRL', style: 'currency' })}
        </ProductPrice>
      </ProductContent>
    </Container>
  )
}

export default ProductItem
