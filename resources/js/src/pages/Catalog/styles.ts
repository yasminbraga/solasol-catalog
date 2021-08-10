import styled from 'styled-components'
import colors from '../../styles/colors'

export const Container = styled.div`
  padding: 1rem;
  border-radius: 0.35rem;
  position: relative;
  z-index: 10;

  @media screen and (min-width: 1020px) {
  }
`

export const Grid = styled.div`
  display: grid;
  gap: 0.5rem;
  grid-template-columns: 1fr 1fr;

  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media screen and (min-width: 980px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`

export const Results = styled.div`
  display: flex;
  width: 100%;
  font-size: 13px;
  justify-content: space-between;
  margin-bottom: 0.75rem;
  color: ${colors.gray};

  @media screen and (min-width: 540px) {
    margin-bottom: 1rem;
  }
`

export const ResultItem = styled.div``
