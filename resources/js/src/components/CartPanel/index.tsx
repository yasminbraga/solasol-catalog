import React from 'react'
import { useSelector } from 'react-redux'
import { MdChevronLeft, MdShoppingCart } from 'react-icons/md'

import { selectOrder } from '../../features/order'
import ProductCartList from '../ProductCartList'

import {
  ClosePanelButton,
  Container,
  PanelBody,
  PanelFooter,
  PanelHeader,
  PanelSubHeader,
  PanelTitle,
  PanelSubtitle,
  TotalContainer,
  FinishOrderButton,
  TotalLabel,
  TotalValue,
} from './styles'
import { parseMoney } from '../../ultils'

const CartPanel: React.FC<{ show: boolean; onClose: () => void }> = ({ show, onClose }) => {
  const order = useSelector(selectOrder)

  return (
    <Container show={show}>
      <PanelHeader>
        <ClosePanelButton onClick={onClose}>
          <MdChevronLeft size={22} />
          Voltar para as compras
        </ClosePanelButton>
        <PanelSubHeader>
          <PanelTitle>
            <MdShoppingCart fontVariant="out" />
            Meu Carrinho
          </PanelTitle>
          <PanelSubtitle>
            {!!order.cart.totalQuantity && `${order.cart.totalQuantity} Produto(s)`}
          </PanelSubtitle>
        </PanelSubHeader>
      </PanelHeader>
      <PanelBody>
        <ProductCartList />
      </PanelBody>
      <PanelFooter>
        <TotalContainer>
          <TotalLabel>Total</TotalLabel>
          <TotalValue>{parseMoney(order.cart.totalPrice)}</TotalValue>
        </TotalContainer>
        <FinishOrderButton>Finalizar pedido</FinishOrderButton>
      </PanelFooter>
    </Container>
  )
}

export default CartPanel
