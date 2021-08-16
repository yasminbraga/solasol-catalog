import React from 'react'
import { MdRemove, MdAdd } from 'react-icons/md'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../../app/hooks'
import { selectOrder, updateProductQuantity } from '../../features/order'
import Product from '../../interfaces/Product'
import Loader from '../Loader'

import {
  QuantityContainer,
  QuantityInputGroup,
  QuantityInput,
  QuantityChangeButton,
} from './styles'

const ProductQuantity: React.FC<{ data: Product }> = ({ data }) => {
  const order = useSelector(selectOrder)
  const product = order.cart.products.find((product) => product.id === data.id)
  const quantity = product?.quantity ?? 0

  const appDispatch = useAppDispatch()

  function dispatchUpdate(quantity: number) {
    appDispatch(updateProductQuantity({ id: data.id, quantity }))
  }

  function incrementQuantity() {
    dispatchUpdate(quantity + 1)
  }

  function decrementQuantity() {
    dispatchUpdate(quantity - 1)
  }

  return (
    <QuantityContainer>
      <QuantityInputGroup>
        {product?.loading ? (
          <Loader />
        ) : (
          <>
            <QuantityChangeButton disabled={quantity === 0} onClick={decrementQuantity}>
              <MdRemove />
            </QuantityChangeButton>
            <QuantityInput
              value={quantity}
              onChange={(ev) => {
                dispatchUpdate(+ev.target.value)
              }}
              type="number"
              step={1}
              min={0}
              onFocus={(ev) => {
                ev.target.select()
              }}
            />
            <QuantityChangeButton onClick={incrementQuantity}>
              <MdAdd />
            </QuantityChangeButton>
          </>
        )}
      </QuantityInputGroup>
    </QuantityContainer>
  )
}

export default ProductQuantity
