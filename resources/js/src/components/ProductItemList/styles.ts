import styled from 'styled-components'

export const Container = styled.div`
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
