import styled from 'styled-components'
import colors from '../../styles/colors'
import { standardShadow } from '../../styles/globals'

export const Container = styled.div`
  padding: 0 1rem 0 1rem;
  margin: 0 auto;
  position: sticky;
  width: 100%;
  top: calc(4.75rem);
  z-index: 20;
`

export const FilterContainer = styled.div`
  display: flex;
  background: ${colors.lightBg};
  border-radius: 0.35rem;

  width: 100%;
  max-width: 1020px;
  margin: 0 auto;

  ${standardShadow};
`

export const InputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  z-index: 20;

  svg {
    position: absolute;
    font-size: 20px;
    z-index: 10;
    left: 1rem;
  }
`

export const Input = styled.input`
  border: 0;
  width: 100%;
  padding: 0 1rem 0 3rem;
  height: 4rem;
  background: transparent;

  font-size: 16px;
  outline: none;
  box-shadow: none !important;

  @media screen and (min-width: 1020px) {
  }
`

export const Select = styled.div`
  position: relative;
  padding-right: 1rem;
  display: flex;
  align-items: center;
`

export const SelectItem = styled.div`
  padding: 0.5rem 0.75rem;
  display: flex;
  align-items: center;

  :hover {
    background: ${colors.inputBg};
  }
`

export const SelectButton = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem 0;
  font-size: 14px;
  cursor: pointer;

  :hover {
    opacity: 0.8;
  }

  svg {
    margin-left: 0.5rem;
    transition: all 0.4s;
  }

  svg.reverse {
    transform: rotate(180deg);
    transition: all 0.4s;
  }
`

export const SelectItems = styled.div`
  position: absolute;
  min-width: 156px;

  padding: 0.5rem 0;
  background: ${colors.lightBg};
  box-shadow: 0 1px 25px 1px rgba(0, 0, 0, 0.07);
  border-radius: 0.35rem;
  top: calc(100% + 0.5rem);
  border: 1px solid ${colors.extraLightGray};
  right: 0;
`

export const Label = styled.label`
  margin-left: 0.5rem;
`

export const Checkbox = styled.input.attrs(() => ({
  type: 'checkbox',
}))``
