import React, { useState } from 'react'
import { useAppSelector } from '../../app/hooks'
import { selectOrder, selectTotalPrice } from '../../features/order'
import Card from '../Card'
import ImmutableProductCartList from '../ImmutableProductCartList'

import { Subtitle } from '../CloseOrderModal/styles'
import {
  Container,
  MoreDetails,
  OrderDetail,
  OrderDetails,
  PageTitle,
  ShowMoreDetailsButton,
  TotalContainer,
} from './styles'
import { parseMoney } from '../../ultils'
import { FiChevronDown } from 'react-icons/fi'

const ClosedOrder: React.FC = () => {
  const order = useAppSelector(selectOrder)
  const totalPrice = useAppSelector(selectTotalPrice)

  const [showDetails, setShowDetails] = useState(false)

  return (
    <Container>
      <Card>
        <PageTitle>Pedido finalizado</PageTitle>
        <Subtitle>Aguarde a confirmação do funcionário</Subtitle>
        <Subtitle>Detalhes do pedido</Subtitle>
        <OrderDetails onClick={() => setShowDetails(!showDetails)}>
          <OrderDetail>Pedido #{order.order.number}</OrderDetail>
          <OrderDetail>
            {order.order.closed_at}

            <ShowMoreDetailsButton
              toggle={showDetails}
              onClick={() => setShowDetails(!showDetails)}
            >
              <FiChevronDown size={20} />
            </ShowMoreDetailsButton>
          </OrderDetail>
        </OrderDetails>
        <MoreDetails show={showDetails}>
          <ImmutableProductCartList />
        </MoreDetails>
        <TotalContainer>
          <h4>Total</h4>
          <h4>{parseMoney(totalPrice)}</h4>
        </TotalContainer>
      </Card>
    </Container>
  )
}

export default ClosedOrder
