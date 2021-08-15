import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  text-align: center;

  padding: 1rem;
  border-radius: 0.35rem;
  position: relative;
  z-index: 10;

  h2 {
    @media screen and (max-width: 540px) {
      font-size: 20px;
    }

    margin-top: 2rem;
  }

  p {
    margin-top: 1rem;
  }
`

export const Img = styled.img`
  width: 100%;

  @media screen and (min-width: 640px) {
    width: 300px;
  }
`
