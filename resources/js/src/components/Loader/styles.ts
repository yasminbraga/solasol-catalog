import styled, { keyframes } from 'styled-components'
import colors from '../../styles/colors'

export const Container = styled.div`
  width: 100%;
`

export const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

export const Spin = styled.div`
  width: 32px;
  height: 32px;
  border: 3px solid ${colors.lightPrimary};
  border-radius: 32px;
  border-left-color: ${colors.primary};
  margin: 0 auto;
  animation: ${spin} 0.75s linear infinite;
`
