import React from 'react'
import Meta from '../../interfaces/Meta'

import { Container, CurrentPageButton, NextButton, NumberButton, PrevButton } from './styles'

interface PaginationProps {
  meta: Meta
  setPage: (page: number) => void
}

const Pagination: React.FC<PaginationProps> = ({ meta, setPage }) => {
  return (
    <Container>
      <PrevButton
        onClick={() => setPage(meta.current_page - 1)}
        disabled={meta.current_page <= meta.first_page}
      >
        Anterior
      </PrevButton>

      {!!(meta.current_page > 2) && (
        <NumberButton onClick={() => setPage(meta.current_page - 2)}>
          {meta.current_page - 2}
        </NumberButton>
      )}

      {!!(meta.current_page > 1) && (
        <NumberButton onClick={() => setPage(meta.current_page - 1)}>
          {meta.current_page - 1}
        </NumberButton>
      )}

      <CurrentPageButton disabled>{meta.current_page}</CurrentPageButton>

      {!!(meta.current_page < meta.last_page) && (
        <NumberButton onClick={() => setPage(meta.current_page + 1)}>
          {meta.current_page + 1}
        </NumberButton>
      )}

      {!!(meta.current_page + 1 < meta.last_page) && (
        <NumberButton onClick={() => setPage(meta.current_page + 2)}>
          {meta.current_page + 2}
        </NumberButton>
      )}

      <NextButton
        onClick={() => setPage(meta.current_page + 1)}
        disabled={meta.current_page >= meta.last_page}
      >
        Proxima
      </NextButton>
    </Container>
  )
}

export default Pagination
