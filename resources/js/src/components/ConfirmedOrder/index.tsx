import React from 'react'

import { useAppSelector } from '../../app/hooks'
import { selectOrder } from '../../features/order'
import Card from '../Card'
import { Container, Img, Title, Subtitle, ImgContainer, OrderDetail, OrderDetails } from './styles'

const imgSrc = require('../../assets/order_confirmed.svg')

const ConfirmeddOrder: React.FC = () => {
  const order = useAppSelector(selectOrder)

  return (
    <Container>
      <Card>
        <OrderDetails>
          <OrderDetail>Pedido #{order.order.number}</OrderDetail>
          <OrderDetail>{order.order.closed_at}</OrderDetail>
        </OrderDetails>
        <ImgContainer>
          <Img src={imgSrc} alt="" />
        </ImgContainer>
        <Title>Pedido confirmado</Title>
        <Subtitle>Seu pedido está sendo preparado, logo entraremos em contato!</Subtitle>
      </Card>
    </Container>
  )
}

export default ConfirmeddOrder
