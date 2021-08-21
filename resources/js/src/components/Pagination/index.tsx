import React from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { changePage } from '../../features/filter'

import { Container, CurrentPageButton, NextButton, NumberButton, PrevButton } from './styles'

const Pagination: React.FC = () => {
  const products = useAppSelector((state) => state.products)

  const appDispatch = useAppDispatch()

  function setPage(page: number) {
    appDispatch(changePage(page))
  }

  if (!products.data.length) return null

  return (
    <Container>
      <PrevButton
        onClick={() => setPage(products.meta.currentPage - 1)}
        disabled={products.meta.currentPage <= products.meta.firstPage}
      >
        Anterior
      </PrevButton>

      {!!(products.meta.currentPage > 2) && (
        <NumberButton onClick={() => setPage(products.meta.currentPage - 2)}>
          {products.meta.currentPage - 2}
        </NumberButton>
      )}

      {!!(products.meta.currentPage > 1) && (
        <NumberButton onClick={() => setPage(products.meta.currentPage - 1)}>
          {products.meta.currentPage - 1}
        </NumberButton>
      )}

      <CurrentPageButton disabled>{products.meta.currentPage}</CurrentPageButton>

      {!!(products.meta.currentPage < products.meta.lastPage) && (
        <NumberButton onClick={() => setPage(products.meta.currentPage + 1)}>
          {products.meta.currentPage + 1}
        </NumberButton>
      )}

      {!!(products.meta.currentPage + 1 < products.meta.lastPage) && (
        <NumberButton onClick={() => setPage(products.meta.currentPage + 2)}>
          {products.meta.currentPage + 2}
        </NumberButton>
      )}

      <NextButton
        onClick={() => setPage(products.meta.currentPage + 1)}
        disabled={products.meta.currentPage >= products.meta.lastPage}
      >
        Proxima
      </NextButton>
    </Container>
  )
}

export default Pagination
