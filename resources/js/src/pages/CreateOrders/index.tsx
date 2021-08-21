import React, { useEffect, useState } from 'react'
import { MdArrowForward, MdShoppingCart } from 'react-icons/md'
import { useHistory, useLocation } from 'react-router-dom'
import InlineLoader from '../../components/InlineLoader'
import Input from '../../components/Input'
import { useHeader } from '../../providers/header'
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

interface ResponseData {
  customer: {
    id: number
  }
  order: {
    uuid: string
  }
}

const CreateOrders: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const location = useLocation()
  const history = useHistory()
  const catalogId = location.search.split('=')[1]

  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const { setInvalid } = useHeader()

  useEffect(() => {
    setInvalid(true)
  }, [])

  function validateFields() {
    if (phone.length < 11) return false
    if (!name) return false

    return true
  }

  async function handleClick() {
    setLoading(true)

    try {
      const {
        data: { customer, order },
      } = await api.post<ResponseData>(
        `/orders`,
        {
          name,
          email,
          phone,
        },
        {
          params: {
            catalogId,
          },
        }
      )

      localStorage.setItem('solalsol:customerId', customer.id.toString())
      localStorage.setItem('solalsol:orderId', order.uuid)

      history.replace({
        pathname: `/pedidos/${order.uuid}`,
        state: {
          customer,
          order,
        },
      })
    } catch (error) {
      console.log(error)
    }
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
          <Input
            onChange={(ev) => setName(ev.target.value)}
            value={name}
            type="text"
            placeholder="Nome"
          />
          <Input
            onChange={(ev) => setEmail(ev.target.value)}
            value={email}
            type="email"
            placeholder="Email (opcional)"
          />
          <Input
            onChange={(ev) => setPhone(ev.target.value)}
            value={phone}
            type="tel"
            placeholder="Telefone (com DDD)"
            maxLength={11}
          />

          <Button disabled={!validateFields()} onClick={handleClick} type="button">
            Iniciar pedido
            {loading ? <InlineLoader /> : <MdArrowForward size={24} />}
          </Button>
        </AccountForm>
      </Card>
    </Container>
  )
}

export default CreateOrders
