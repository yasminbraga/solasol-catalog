import styled from 'styled-components'

export const Container = styled.div`
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;

  @media screen and (min-width: 768px) {
    flex-direction: row;
    justify-content: space-around;
  }
`

export const Img = styled.img`
  width: 300px;
  padding: 1rem;

  @media screen and (min-width: 768px) {
    width: 600px;
  }
`

export const ErrorMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  h1 {
    font-size: 100px;
    color: #fca311;
  }

  h3 {
    color: rgba(0, 0, 0, 0.6);
  }

  p {
    text-align: center;
    color: #a0a2a7;
  }

  a {
    width: 200px;
    background: #fca311;
    border-radius: 6px;
    color: white;
    font-weight: 500;
    text-align: center;
    padding: 6px;
  }

  @media screen and (min-width: 768px) {
    padding: 1rem;

    h1 {
      font-size: 200px;
    }

    h3 {
      font-size: 24px;
    }

    p {
      font-size: 20px;
    }
  }
`
