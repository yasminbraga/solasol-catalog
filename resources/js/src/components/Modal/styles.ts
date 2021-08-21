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
  border-radius: 1rem;
  max-height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`

export const ModalHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  padding: 1rem;
  border-bottom: 1px solid ${colors.extraLightGray};

  button {
    background: transparent;
    border: 0;
    padding: 0;
    display: flex;
    align-items: center;

    :hover {
      cursor: pointer;
      svg {
        stroke: #333;
      }
    }
  }

  :last-child {
    justify-self: flex-end;
  }
`

export const ModalBody = styled.div`
  padding: 1rem;
  overflow-y: auto;

  @media screen and (min-width: 768px) {
    ::-webkit-scrollbar {
      width: 5px;
    }

    ::-webkit-scrollbar-track {
      background: transparent;
    }

    ::-webkit-scrollbar-thumb {
      background: ${colors.primary};
    }

    ::-webkit-scrollbar-thumb:hover {
      background: ${colors.lightPrimary};
    }
  }
`

export const ModalTitle = styled.h5`
  font-size: 15px;
  white-space: nowrap;
  font-weight: 500;
  text-align: center;
`

export const ModalFooter = styled.div`
  padding: 1rem;
  display: flex;
  width: 100%;
  border-top: 1px solid ${colors.extraLightGray};
`

export const Button = styled.button`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border: 0;
  border-radius: 0.25rem;
  color: #fff;
  text-align: center;
  font-weight: 500;
  vertical-align: center;
  cursor: pointer;

  + button {
    margin-left: 0.5rem;
  }
`

export const CancelButton = styled(Button)`
  background: ${colors.lightGray};
`

export const ConfirmButton = styled.button`
  color: ${colors.primary};
  justify-self: flex-end;
  font-size: 15px;

  :disabled {
    cursor: not-allowed;
    background: ${colors.lightPrimary};
  }
`
