import React from 'react'

import { BrandTitle, NewOrderLink, ContainerHeader, ContainerOffset } from './styles'

interface HeaderProps {
  invalid: boolean
  showCart?: boolean
}

const Header: React.FC<HeaderProps> = ({ invalid = true }) => {
  return (
    <React.Fragment>
      <ContainerOffset />
      <ContainerHeader>
        <BrandTitle>Sol a sol</BrandTitle>
        {!invalid && <NewOrderLink href="#">Iniciar pedido</NewOrderLink>}
      </ContainerHeader>
    </React.Fragment>
  )
}

export default Header
