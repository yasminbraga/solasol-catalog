import styled from 'styled-components'

import colors from '../../styles/colors'

export const ResultsContainer = styled.div`
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
