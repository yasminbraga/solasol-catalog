import styled, { keyframes } from 'styled-components'
import colors from '../../styles/colors'

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
  border-left-color: #fff;
  margin: 0 auto;
  animation: ${spin} 0.75s linear infinite;
  width: 24px;
  height: 24px;
  display: inline-block;
`
