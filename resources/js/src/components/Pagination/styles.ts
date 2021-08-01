import styled from 'styled-components'
import colors from '../../styles/colors'

export const Container = styled.div`
  width: auto;
  display: flex;
  margin: 0 auto;
  margin-top: 0.75rem;
  padding: 1rem 0;
  justify-content: center;
`

const Button = styled.button`
  background: transparent;
  border: 2px solid transparent;
  padding: 0 0.5rem;
  font-weight: 600;
  color: #454545;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  border-radius: 0.25rem;
  margin: 0 0.25rem;

  :disabled {
    color: ${colors.extraLightGray};
    cursor: not-allowed;
  }

  :hover:not(:disabled) {
    color: #222;
    cursor: pointer;
  }

  transition: all 0.3s ease;
`

export const PrevButton = styled(Button)``

export const CurrentPageButton = styled(Button)`
  background: ${colors.primary};
  width: 32px;

  :disabled {
    color: #fff;
  }
`

export const NextButton = styled(Button)``

export const NumberButton = styled(Button)`
  width: 32px;

  :hover {
    border-color: ${colors.primary};
    color: #fff;
  }
`
