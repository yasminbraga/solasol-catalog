import React from 'react'
import { MdChevronLeft, MdShoppingCart } from 'react-icons/md'

import {
  ClosePanelButton,
  Container,
  PanelBody,
  PanelFooter,
  PanelHeader,
  PanelSubHeader,
  PanelTitle,
  PanelSubtitle,
} from './styles'

const CartPanel: React.FC<{ show: boolean; onClose: () => void }> = ({ show, onClose }) => {
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
            Meu carrinho
          </PanelTitle>
          <PanelSubtitle>2 Produtos</PanelSubtitle>
        </PanelSubHeader>
      </PanelHeader>
      <PanelBody></PanelBody>
      <PanelFooter></PanelFooter>
    </Container>
  )
}

export default CartPanel
