import React, { useState } from 'react'
import { MdChevronLeft, MdShoppingCart } from 'react-icons/md'
import { selectTotalPrice, selectTotalQuantity } from '../../features/order'
import { parseMoney } from '../../ultils'
import { useAppSelector } from '../../app/hooks'
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
import CloseOrderModal from '../CloseOrderModal'

const CartPanel: React.FC<{ show: boolean; onClose: () => void }> = ({ show, onClose }) => {
  const totalPrice = useAppSelector(selectTotalPrice)
  const totalQuantity = useAppSelector(selectTotalQuantity)

  const [showCloseOrderModal, setShowCloseOrderModal] = useState(false)

  return (
    <>
      <CloseOrderModal
        visible={showCloseOrderModal}
        onClose={() => setShowCloseOrderModal(false)}
      />
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
            <PanelSubtitle>{!!totalQuantity && `${totalQuantity} Produto(s)`}</PanelSubtitle>
          </PanelSubHeader>
        </PanelHeader>
        <PanelBody>
          <ProductCartList />
        </PanelBody>
        <PanelFooter>
          <TotalContainer>
            <TotalLabel>Total</TotalLabel>
            <TotalValue>{parseMoney(totalPrice)}</TotalValue>
          </TotalContainer>
          <FinishOrderButton
            onClick={() => {
              setShowCloseOrderModal(true)
              onClose()
            }}
          >
            Finalizar pedido
          </FinishOrderButton>
        </PanelFooter>
      </Container>
    </>
  )
}

export default CartPanel
