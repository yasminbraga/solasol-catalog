import styled from 'styled-components'
import colors from '../../styles/colors'

export const Container = styled.div`
  padding: 0.75rem;
  margin: 0 auto;
  border-radius: 0.35rem;
  background: #fff;
  border: 1px solid ${colors.extraLightGray}; //rgba(0, 0, 0, 0.07);

  @media screen and (min-width: 768px) {
    max-width: 1020px;
    padding: 1.25rem;
  }
`
