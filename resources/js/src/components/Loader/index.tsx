import React from 'react'

import { Container, Spin } from './styles'

const Loader: React.FC = () => {
  return (
    <Container>
      <Spin />
    </Container>
  )
}

export default Loader
