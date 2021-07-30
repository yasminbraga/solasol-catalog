import styled from 'styled-components'
import colors from '../../styles/colors'

export const Container = styled.div`
  padding: 0 1rem 0 1rem;
  margin: 0 auto;
  position: sticky;
  top: calc(4.75rem);
`

export const FilterContainer = styled.div`
  display: flex;
  background: #fff;
  border-radius: 0.35rem;

  max-width: 1020px;
  margin: 0 auto;
  border-bottom: 1px solid rgba(0, 0, 0, 0.07);
`

export const InputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;

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
  z-index: 15;

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
  background: #fff;
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
