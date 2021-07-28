import React from 'react'

import { Container, Img } from './styles'

const src = require('../../assets/not_found.svg') as string

const NotFound: React.FC<{ title?: string; subtitle?: string }> = ({ title, subtitle }) => {
  return (
    <Container>
      <Img src={src} alt="Não encontrado" />
      <h2>{title ?? 'Nenhum item encontrado.'} </h2>

      {subtitle && <p>{subtitle}</p>}
    </Container>
  )
}

export default NotFound
