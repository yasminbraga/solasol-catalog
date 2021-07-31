import React from 'react'

import { Container, ErrorMessage, Img } from './styles'

const notFound = require('../../assets/not_found_404.svg') as string

const NotFound: React.FC = () => {
  return (
    <Container>
      <Img src={notFound} />
      <ErrorMessage>
        <h1>404</h1>
        <h3>Página não encontrada!</h3>
        <p>Por favor, retorne para a página inicial.</p>
        <a href="/">Página Inicial</a>
      </ErrorMessage>
    </Container>
  )
}

export default NotFound
