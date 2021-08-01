import styled, { keyframes } from 'styled-components'
import colors from '../../styles/colors'

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

export const ModalDialog = styled.div`
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

export const ModalContent = styled.div`
  width: 100%;
  background: #fff;
  border-radius: 0.35rem;
  max-height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid ${colors.extraLightGray};

  h5 {
    font-size: 20px;
  }

  button {
    background: transparent;
    border: 0;
    padding: 0.5rem;
    display: flex;
    align-items: center;

    :hover {
      cursor: pointer;
      svg {
        stroke: #333;
      }
    }
  }
`

export const ModalBody = styled.div`
  padding: 1rem;
  overflow-y: auto;
`

export const ModalFooter = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: flex-end;
  border-top: 1px solid ${colors.extraLightGray};

  button {
    padding: 0.5rem;
    border: 0;
    border-radius: 0.25rem;
    color: #fff;

    text-align: center;
    font-weight: 400;
    vertical-align: center;
    cursor: pointer;

    + button {
      margin-left: 0.5rem;
    }
  }
`

export const CancelButton = styled.button`
  background: ${colors.gray};
`

export const ConfirmButton = styled.button`
  background: ${colors.primary};
`
