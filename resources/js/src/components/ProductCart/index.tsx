import React from 'react'
import { MdRemoveShoppingCart } from 'react-icons/md'
import { useAppDispatch } from '../../app/hooks'
import { removeProductRequest } from '../../features/order'
import { ProductCart as IProductCart } from '../../interfaces/Product'
import { parseMoney } from '../../ultils'
import ProductQuantity from '../ProductQuantity'

import {
  Col,
  Container,
  Grid,
  ProductImage,
  ProductName,
  ProductPrice,
  ProductSubtotal,
  RemoveFromCart,
  Row,
} from './styles'

const ProductCart: React.FC<{ data: IProductCart }> = ({ data }) => {
  const appDispatch = useAppDispatch()

  return (
    <Container>
      <ProductImage src={data.file?.secure_url} />

      <Col>
        <Row>
          <div>
            <ProductName>{data.name}</ProductName>
            <ProductPrice>{parseMoney(+data.price)}</ProductPrice>
          </div>
          <RemoveFromCart onClick={() => appDispatch(removeProductRequest({ id: data.id }))}>
            <MdRemoveShoppingCart size={24} />
          </RemoveFromCart>
        </Row>
        <Grid>
          <ProductQuantity data={data} />
          <ProductSubtotal>{parseMoney(data.quantity * data.price)}</ProductSubtotal>
        </Grid>
      </Col>
    </Container>
  )
}

export default ProductCart
