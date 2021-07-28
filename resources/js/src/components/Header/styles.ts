import styled from 'styled-components'
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
`

export const ContainerOffset = styled.div`
  position: fixed;
  z-index: -5;
  width: 100%;
  top: 0;
  height: 9rem;
  background: ${colors.primary};
`

export const BrandTitle = styled.h2`
  color: ${colors.lightText};
`

export const NewOrderLink = styled.a`
  background: transparent;
  color: ${colors.lightPrimary};
  font-size: 16px;
  font-weight: 500;

  :hover {
    color: #fff;
  }
`
