import styled from 'styled-components'

export const Container = styled.div`
  @media screen and (min-width: 540px) {
    display: grid;
    gap: 1rem;
    grid-template-columns: 1fr 1fr;
  }

  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media screen and (min-width: 980px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`
