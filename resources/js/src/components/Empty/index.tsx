import React from 'react'

import { Container, Img } from './styles'

const empty = require('../../assets/empty.svg') as string

const Empty: React.FC<{ title?: string; subtitle?: string }> = ({ title, subtitle }) => {
  return (
    <Container>
      <Img src={empty} alt="Lista vazia" />
      <h2>{title ?? 'Nenhum item encontrado.'} </h2>

      {subtitle && <p>{subtitle}</p>}
    </Container>
  )
}

export default Empty
