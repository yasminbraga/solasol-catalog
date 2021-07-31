import styled from 'styled-components'

export const Container = styled.div`
  padding: 1rem;
  border-radius: 0.35rem;

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
