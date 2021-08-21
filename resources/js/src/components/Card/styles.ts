import styled from 'styled-components'
import colors from '../../styles/colors'
import { standardShadow } from '../../styles/globals'

export const Container = styled.div`
  padding: 0.75rem;
  margin: 0 auto;
  border-radius: 0.35rem;
  background: ${colors.lightBg};
  ${standardShadow};

  @media screen and (min-width: 768px) {
    max-width: 1020px;
    padding: 1.25rem;
  }
`
