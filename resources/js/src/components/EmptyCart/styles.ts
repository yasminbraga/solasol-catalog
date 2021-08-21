import styled from 'styled-components'
import colors from '../../styles/colors'

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 2rem;
  margin-top: 2rem;
`

export const Img = styled.img`
  width: 70%;

  @media screen and (min-width: 640px) {
  }
`

export const EmptyInfo = styled.h4`
  color: ${colors.gray};
  font-weight: 500;
  max-width: 75%;
  text-align: center;
`
