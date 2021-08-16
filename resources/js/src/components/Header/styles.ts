import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'
import colors from '../../styles/colors'

export const ContainerHeader = styled.div`
  position: sticky;
  width: 100%;
  display: flex;
  top: 0;
  height: 5rem;
  padding: 0 1.25rem;
  justify-content: space-between;
  align-items: center;
  background: ${colors.primary};
  z-index: 15;
`

export const ContainerOffset = styled.div`
  position: fixed;
  z-index: -5;
  width: 100%;
  top: 0;
  left: 0;
  height: 12rem;
  background: ${colors.primary};
`

export const Img = styled.img`
  width: 150px;
`

export const Button = css`
  background: transparent;
  color: ${colors.lightText};
  font-size: 17px;
  font-weight: 500;

  :active {
    color: ${colors.lightPrimary};
  }

  svg {
    margin-left: 0.5rem;
    vertical-align: middle;
  }
`

export const NewOrderButton = styled(Link)`
  ${Button}
`

export const ShowCartButton = styled.button<{ totalCart: number }>`
  border: 0;
  ${Button}
  position: relative;

  ::after {
    content: '${(props) => props.totalCart}';
    position: absolute;
    width: 22px;
    height: 22px;
    padding: 0.2rem;
    color: ${colors.lightText};
    background: ${colors.success};
    border-radius: 20px;
    font-size: 10px;
    top: -12px;
    right: -12px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 600;
  }
`

export const Subtitle = styled.h4`
  text-align: center;
  max-width: 90%;
  margin-bottom: 0.75rem;
`
