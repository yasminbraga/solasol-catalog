import React, { Fragment, useEffect, useState } from 'react'
import { useHeader } from '../../providers/header'

import {
  BrandTitle,
  NewOrderButton,
  ContainerHeader,
  ContainerOffset,
  ShowCartButton,
} from './styles'
import { MdShoppingCart } from 'react-icons/md'
import { useParams } from 'react-router-dom'
import CartPanel from '../CartPanel'

import { selectOrder } from '../../features/order'
import { useSelector } from 'react-redux'

interface HeaderProps {
  invalid?: boolean
  showCart?: boolean
}

const Header: React.FC<HeaderProps> = () => {
  const { invalid, showCartButton } = useHeader()

  const [showPanel, setShowPanel] = useState(false)

  const order = useSelector(selectOrder)

  useEffect(() => {
    if (showPanel) {
      document.body.classList.add('cart-panel-open')
    } else {
      document.body.classList.remove('cart-panel-open')
    }
  }, [showPanel])

  const { id } = useParams<{ id: string }>()

  return (
    <Fragment>
      <ContainerOffset />
      <CartPanel show={showPanel} onClose={() => setShowPanel(false)} />

      <ContainerHeader>
        <BrandTitle>Sol a sol</BrandTitle>

        {!invalid && !showCartButton && (
          <NewOrderButton to={`/pedidos/${id}`}>
            Iniciar pedido
            <MdShoppingCart size={22} />
          </NewOrderButton>
        )}

        {showCartButton && (
          <ShowCartButton onClick={() => setShowPanel(true)} totalCart={order.cart.totalQuantity}>
            <MdShoppingCart size={32} />
          </ShowCartButton>
        )}
      </ContainerHeader>
    </Fragment>
  )
}

export default Header
