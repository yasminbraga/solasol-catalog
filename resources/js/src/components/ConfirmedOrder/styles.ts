import styled from 'styled-components'

export const Container = styled.div`
  padding: 1rem;
  border-radius: 0.35rem;
  position: relative;
  z-index: 10;

  div {
  }
`

export const OrderDetails = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`

export const OrderDetail = styled.h4`
  font-weight: 500;
`

export const ImgContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`

export const Img = styled.img`
  width: 100%;
  margin: 0 auto;
  margin-bottom: 1rem;

  @media screen and (min-width: 768px) {
    width: 380px;
  }
`

export const Title = styled.h3`
  text-align: center;
  margin-bottom: 1rem;
  font-weight: 500;
`

export const Subtitle = styled.p`
  text-align: center;
`
