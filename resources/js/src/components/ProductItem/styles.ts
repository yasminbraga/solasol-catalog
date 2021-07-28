import styled from 'styled-components'
import colors from '../../styles/colors'

export const Container = styled.div`
  width: 100%;

  text-align: center;
  display: flex;
  align-items: center;
  flex-direction: column;

  border-bottom: 1px solid ${colors.extraLightGray};
  overflow: hidden;
  border: 1px solid ${colors.extraLightGray};
  border-radius: 12px;

  + div {
    margin-top: 1rem;
  }

  @media screen and (min-width: 540px) {
    + div {
      margin: 0;
    }
  }
`

export const Img = styled.img`
  width: 100%;
  height: 100%;

  height: 300px;
  object-fit: cover;

  @media screen and (min-width: 540px) {
    height: 250px;
  }
`

export const ProductContent = styled.div`
  padding: 1rem;
  width: 100%;
  /* border-top: 1px solid ${colors.extraLightGray}; */
`

export const ProductName = styled.h3`
  font-weight: 400;
  font-size: 20px;
  text-transform: uppercase;
`

export const ProductPrice = styled.h3`
  font-weight: 600;
  font-size: 20px;
  color: ${colors.primary};
`
