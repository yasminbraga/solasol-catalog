import styled from 'styled-components'
import colors from '../../styles/colors'

export const Container = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  border-top: 1px solid ${colors.extraLightGray};
  padding: 1rem 0;
`

export const Row = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`

export const Col = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  height: 100px;
  justify-content: space-between;
  align-content: center;
`

export const Grid = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
`

export const ProductImage = styled.img`
  width: 72px;
  height: 72px;
`

export const ProductName = styled.h3`
  font-weight: normal;
  font-size: 16px;
`

export const ProductPrice = styled.h5`
  font-weight: normal;
`

export const ProductSubtotal = styled.h4`
  text-align: right;
  font-weight: 600;
`
export const RemoveFromCart = styled.button`
  background: transparent;
  color: ${colors.error};
`
