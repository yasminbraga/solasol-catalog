import React, { useState } from 'react'
import { MdArrowForward, MdShoppingCart } from 'react-icons/md'
import { useLocation, useParams } from 'react-router-dom'
import InlineLoader from '../../components/InlineLoader'
import Input from '../../components/Input'
import api from '../../services/api'

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
  const location = useLocation()
  const catalogId = location.search.split('=')[1]

  const [name, setName] = useState()

  async function handleClick() {
    setLoading(true)
    console.log(catalogId)
    try {
      const response = await api.post(`/catalogs/${catalogId}`)
    } catch (error) {}
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
