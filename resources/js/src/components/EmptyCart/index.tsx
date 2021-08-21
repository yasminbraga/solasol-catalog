import React from 'react'

import { Container, EmptyInfo, Img } from './styles'

const empty = require('../../assets/empty_cart.svg') as string

const EmptyCart: React.FC<{ title?: string; subtitle?: string }> = ({ title }) => {
  return (
    <Container>
      <Img src={empty} alt="Lista vazia" />
      <EmptyInfo>{title ?? 'Você ainda não adicionou nenhum produto, comece agora.'} </EmptyInfo>
    </Container>
  )
}

export default EmptyCart
