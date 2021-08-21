import React from 'react'
import { ProductCart as IProductCart } from '../../interfaces/Product'
import { parseMoney } from '../../ultils'
import styed from 'styled-components'

import {
  Col,
  Container,
  Grid,
  ProductImage,
  ProductName,
  ProductPrice,
  ProductSubtotal,
  Row,
} from '../ProductCart/styles'
import colors from '../../styles/colors'

const Quantidade = styed.span`
  color: ${colors.lightGray};
  font-size: 14px;
  text-transform: uppercase;
`

const ImmutableProductCart: React.FC<{ data: IProductCart }> = ({ data }) => {
  return (
    <Container>
      <ProductImage src={data.file?.secure_url} />

      <Col>
        <Row>
          <div>
            <ProductName>{data.name}</ProductName>
            <ProductPrice>{parseMoney(+data.price)}</ProductPrice>
          </div>
          <div>
            <Quantidade>Qtd</Quantidade> <span>&times;{data.quantity}</span>
          </div>
        </Row>
        <Grid>
          <div />
          <ProductSubtotal>{parseMoney(data.quantity * data.price)}</ProductSubtotal>
        </Grid>
      </Col>
    </Container>
  )
}

export default ImmutableProductCart
