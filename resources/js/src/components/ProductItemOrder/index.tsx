import React from 'react'
import { useSelector } from 'react-redux'
import { selectOrder } from '../../features/order'
import Product from '../../interfaces/Product'
import AddToCart from '../AddToCart'
import ProductQuantity from '../ProductQuantity'

import { Container, ProductImage, ProductContent, ProductName, ProductPrice } from './styles'

interface ProductItemOrderProps {
  data: Product
}

const ProductItemOrder: React.FC<ProductItemOrderProps> = ({ data }) => {
  const order = useSelector(selectOrder)
  const added = order.cart.products.find((product) => product.id === data.id)

  return (
    <Container>
      <ProductImage src={data.file?.secure_url} alt={data.name} />

      <ProductContent>
        <ProductName title={data.name}>{data.name}</ProductName>
        <ProductPrice>
          {Number(data.price).toLocaleString('pt-BR', { currency: 'BRL', style: 'currency' })}
        </ProductPrice>

        {added ? <ProductQuantity data={data} /> : <AddToCart data={data} />}
      </ProductContent>
    </Container>
  )
}

export default ProductItemOrder
