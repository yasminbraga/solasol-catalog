import React, { useEffect, useState } from 'react'
import { MdRemove, MdAdd } from 'react-icons/md'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../../app/hooks'
import {
  removeProductRequest,
  selectOrder,
  updateProductQuantityRequest,
} from '../../features/order'
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
  // const quantity = product?.quantity ?? 0
  const [quantity, setQuantity] = useState(product?.quantity ?? 0)

  useEffect(() => {
    setQuantity(product?.quantity ?? 0)
  }, [product?.quantity])

  const appDispatch = useAppDispatch()

  function dispatchUpdate(quantity: number) {
    appDispatch(updateProductQuantityRequest({ id: data.id, quantity }))
  }

  function incrementQuantity() {
    setQuantity((state) => {
      dispatchUpdate(state + 1)

      return state++
    })
  }

  function decrementQuantity() {
    setQuantity((state) => {
      if (state - 1 <= 0) {
        appDispatch(removeProductRequest({ id: data.id }))

        return 0
      }

      dispatchUpdate(state - 1)

      return state--
    })
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
                if (+ev.target.value <= 0) {
                  appDispatch(removeProductRequest({ id: data.id }))
                  return 0
                }

                setQuantity(+ev.target.value)
              }}
              onKeyDown={(ev) => {
                if (ev.key === 'Enter') {
                  dispatchUpdate(quantity)
                }
              }}
              type="number"
              step={1}
              min={0}
              onFocus={(ev) => {
                ev.target.select()
              }}
              onBlur={(ev) => {
                setQuantity(() => {
                  dispatchUpdate(+ev.target.value)

                  return +ev.target.value
                })
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
