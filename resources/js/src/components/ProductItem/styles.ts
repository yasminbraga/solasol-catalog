import styled from 'styled-components'
import colors from '../../styles/colors'

export const Container = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  flex-direction: column;

  border-bottom: 1px solid ${colors.extraLightGray};
  overflow: hidden;
  border: 1px solid ${colors.extraLightGray};
  border-radius: 0.35rem;

  @media screen and (min-width: 540px) {
    + div {
      margin: 0;
    }
  }
`

export const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  min-height: 165px;

  object-fit: cover;

  @media screen and (min-width: 540px) {
    height: 225px;
  }
`

export const ProductContent = styled.div`
  padding: 0.5rem;
  width: 100%;
  background: #fff;

  @media screen and (min-width: 540px) {
    padding: 1rem;
  }
`

export const ProductName = styled.h3`
  font-weight: 400;
  font-size: 13px;

  max-width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
`

export const ProductPrice = styled.h3`
  font-weight: 600;
  font-size: 16px;
  color: #333;
`
