import styled, { keyframes } from 'styled-components'

const show = keyframes`
  from {
    opacity: 0;
  } to {
    opacity: 1;
  }
`

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);

  backdrop-filter: blur(5px);
  z-index: 50;
  overflow-y: auto;

  animation: ${show} 0.15s linear;
`

export const ImageRef = styled.div`
  height: calc(100% - 3rem);
  margin: 1rem;
  max-width: 500px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media screen and (min-width: 540px) {
    margin: 1.5rem auto;
  }
`
export const ImageModalContent = styled.div`
  width: 100%;
  background: #fff;
  border-radius: 1rem;
  max-height: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  flex-direction: column;

  button {
    justify-content: flex-start;
    align-self: flex-end;
    background: transparent;
    padding: 0.5rem;
  }

  img {
    width: 300px;
    padding: 1rem;
  }
`
