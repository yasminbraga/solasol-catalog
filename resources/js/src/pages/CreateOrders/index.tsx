import React, { useState } from 'react'
import { MdArrowForward, MdShoppingCart } from 'react-icons/md'
import InlineLoader from '../../components/InlineLoader'
import Input from '../../components/Input'

import {
  Container,
  Title,
  Subtitle,
  AccountForm,
  Button,
  Card,
  FormHeader,
  FormRow,
} from './styles'

const CreateOrders: React.FC = () => {
  const [loading, setLoading] = useState(false)

  async function handleClick() {
    setLoading(true)
  }

  return (
    <Container>
      <Card>
        <FormHeader>
          <FormRow>
            <Title>Iniciar pedido</Title>
            <Subtitle>Antes de iniciar o seu pedido, por favor, preencha seus dados.</Subtitle>
          </FormRow>
          <MdShoppingCart size={46} />
        </FormHeader>

        <AccountForm>
          <Input type="text" placeholder="Nome" />
          <Input type="email" placeholder="Email (opcional)" />
          <Input type="tel" placeholder="Telefone" />

          <Button onClick={handleClick} type="button">
            Iniciar pedido
            {loading ? <InlineLoader /> : <MdArrowForward size={24} />}
          </Button>
        </AccountForm>
      </Card>
    </Container>
  )
}

export default CreateOrders
