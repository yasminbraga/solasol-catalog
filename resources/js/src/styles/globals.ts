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

    :active {
      opacity: 0.6;
    }

    :hover {
      cursor: pointer;
    }

    :disabled {
      opacity: .6;
      cursor: not-allowed;
    }

    transition: opacity 0.3s ease;
  }

  body.cart-panel-open {
    overflow: hidden;
  }

  #app {
    position: relative;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type=number] {
    -moz-appearance: textfield;
  }

  input {
    outline: none;
    border: 1px solid transparent;

    :focus {
      box-shadow: ${colors.primary} 0 0 3px 0;
      border-color: ${colors.primary};
    }
  }
`

export const standardShadow = css`
  box-shadow: rgba(0, 0, 0, 0.1) 0 1px 4px;
`

export const primaryShadow = css`
  box-shadow: ${colors.lightPrimary} 0 1px 4px;
`

export default GlobalStyle
