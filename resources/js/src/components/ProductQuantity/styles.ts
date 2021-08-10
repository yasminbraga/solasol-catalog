import styled from 'styled-components'
import colors from '../../styles/colors'

export const QuantityContainer = styled.div``

export const QuantityInputGroup = styled.div`
  display: flex;
  border-radius: 0.25rem;
  border: 1px solid ${colors.extraLightGray};
  overflow: hidden;
  height: 42px;
`

const BaseButton = styled.button`
  width: 36px;
  height: 42px;

  svg {
    vertical-align: middle;
    width: 20px;
    height: 20px;
  }

  :hover {
    cursor: pointer;
  }

  transition: all 0.3s ease;
`

export const QuantityChangeButton = styled(BaseButton)`
  width: 64px;
  background: transparent;
  color: ${colors.gray};

  :disabled {
    pointer-events: none;
    cursor: not-allowed;
  }

  :active {
    background: ${colors.primary};
    color: #fff;
  }
`

export const QuantityInput = styled.input`
  width: 100%;
  text-align: center;
  border: 0;
  outline: none;
`
