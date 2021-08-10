import React from 'react'
import styled from 'styled-components'
import { MdAddShoppingCart } from 'react-icons/md'

import colors from '../../styles/colors'
import { standardShadow } from '../../styles/globals'
import { useAppDispatch } from '../../app/hooks'
import { addProduct } from '../../features/order'
import Product from '../../interfaces/Product'

const Button = styled.button`
  border-radius: 0.25rem;
  background: ${colors.primary};
  color: ${colors.lightText};
  padding: 0 1rem;
  font-weight: 500;
  border: 1px solid ${colors.primary};

  width: 100%;
  height: 42px;
  ${standardShadow}

  svg {
    vertical-align: middle;
    width: 20px;
    height: 20px;
    float: right;
  }

  :hover {
    cursor: pointer;
  }

  :active {
    opacity: 0.6;
  }

  transition: all 0.3s ease;
`

const AddToCart: React.FC<{ data: Product }> = ({ data }) => {
  const appDispatch = useAppDispatch()

  return (
    <Button
      onClick={() => {
        appDispatch(addProduct(data))
      }}
    >
      Adicionar
      <MdAddShoppingCart />
    </Button>
  )
}

export default AddToCart
