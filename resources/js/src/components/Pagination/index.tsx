import React, { Dispatch, SetStateAction } from 'react'
import Meta from '../../interfaces/Meta'
import Loader from '../Loader'

import { Container, PreviousPage } from './styles'

interface PaginationProps {
  meta: Meta
  page: number
  setPage: Dispatch<SetStateAction<number>>
  loading: boolean
}

const Pagination: React.FC<PaginationProps> = ({ meta, page, setPage, loading }) => {
  if (loading) {
    return (
      <Container>
        <Loader />
      </Container>
    )
  }

  return (
    <Container>
      {page < meta.last_page && (
        <PreviousPage
          onClick={() =>
            setPage((page) => {
              if (page < meta.last_page) {
                return page + 1
              }

              return page
            })
          }
        >
          Ver mais
        </PreviousPage>
      )}
    </Container>
  )
}

export default Pagination
