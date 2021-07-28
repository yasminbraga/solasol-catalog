import styled, { createGlobalStyle } from 'styled-components'
import colors from './colors'

export const Container = styled.div`
  padding: 0 1rem 1rem 1rem;
`

const GlobalStyle = createGlobalStyle`
  body {
    background: ${colors.background};
    color: #646464;
  }
`

export default GlobalStyle
