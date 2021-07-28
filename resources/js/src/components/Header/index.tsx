import React from 'react'

import { BrandTitle, NewOrderLink, ContainerHeader, ContainerOffset } from './styles'

const Header = () => {
  return (
    <React.Fragment>
      <ContainerOffset />

      <ContainerHeader>
        <BrandTitle>Sol a sol</BrandTitle>
        <NewOrderLink href="#">Iniciar pedido</NewOrderLink>
      </ContainerHeader>
    </React.Fragment>
  )
}

export default Header
