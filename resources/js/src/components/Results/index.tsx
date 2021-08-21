import React from 'react'
import { useAppSelector } from '../../app/hooks'
import { ResultItem, ResultsContainer } from './styles'

const Results: React.FC = () => {
  const filter = useAppSelector((state) => state.filter)
  const products = useAppSelector((state) => state.products)

  if (!products.data.length) return null

  return (
    <ResultsContainer>
      {filter?.name ? (
        <ResultItem>
          {products.data.length} resultado(s) para {filter.name}
        </ResultItem>
      ) : (
        <ResultItem>Exibindo {products.data.length} resultado(s)</ResultItem>
      )}
      <ResultItem>
        Página {products.meta.currentPage} de {products.meta?.lastPage} - Total{' '}
        {products.meta?.total}
      </ResultItem>
    </ResultsContainer>
  )
}

export default Results
