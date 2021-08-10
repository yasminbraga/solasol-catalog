import styled, { createGlobalStyle, css } from 'styled-components'
import colors from './colors'

export const Container = styled.div`
  padding: 0 1rem 1rem 1rem;
`

const GlobalStyle = createGlobalStyle`
  body {
    background: ${colors.background};
    color: #646464;
  }

  html, body {
    height: 100%;
  }

  button {
    border: 0;
    background: ${colors.inputBg};
  }

  body.cart-panel-open {
    overflow: hidden;
  }

  #app {
    position: relative;
  }
`

export const standardShadow = css`
  box-shadow: rgba(0, 0, 0, 0.1) 0 1px 4px;
`

export default GlobalStyle
