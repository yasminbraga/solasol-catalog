import React, { Fragment, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { MdShoppingCart } from 'react-icons/md'

import { NewOrderButton, ContainerHeader, ContainerOffset, ShowCartButton, Img } from './styles'
import { useHeader } from '../../providers/header'
import { useAppSelector } from '../../app/hooks'
import CartPanel from '../CartPanel'
const logoSrc = require('../../assets/logoline-white-solasol.png') as string

interface HeaderProps {
  invalid?: boolean
  showCart?: boolean
}

const Header: React.FC<HeaderProps> = () => {
  const order = useAppSelector((state) => state.order)
  const { id } = useParams<{ id: string }>()
  const { invalid } = useHeader()
  const [showPanel, setShowPanel] = useState(false)

  useEffect(() => {
    if (showPanel) {
      document.body.classList.add('cart-panel-open')
    } else {
      document.body.classList.remove('cart-panel-open')
    }
  }, [showPanel])

  return (
    <Fragment>
      <ContainerOffset />
      <CartPanel show={showPanel} onClose={() => setShowPanel(false)} />

      <ContainerHeader>
        <Img src={logoSrc} />
        {!invalid && !order.valid ? (
          <NewOrderButton
            to={{
              pathname: '/pedidos/create',
              search: `?catalogId=${id}`,
            }}
          >
            Iniciar pedido
            <MdShoppingCart size={22} />
          </NewOrderButton>
        ) : order.valid ? (
          <ShowCartButton onClick={() => setShowPanel(true)} totalCart={order.cart.totalQuantity}>
            <MdShoppingCart size={32} />
          </ShowCartButton>
        ) : null}
      </ContainerHeader>
    </Fragment>
  )
}

export default Header
