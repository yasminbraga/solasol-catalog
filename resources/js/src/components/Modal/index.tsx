import React, { createRef, useEffect } from 'react'

import {
  Container,
  ModalBody,
  ModalDialog,
  ModalContent,
  ModalFooter,
  ModalHeader,
  CancelButton,
  ConfirmButton,
} from './styles'

import { FiX } from 'react-icons/fi'

interface ModalProps {
  title: string
  visible: boolean
  onClose: () => void
  onConfirm?: () => void
  confirmButtonText?: string
  confirmButtonDisabled?: boolean
}

const Modal: React.FC<ModalProps> = ({
  children,
  visible,
  title,
  onClose,
  onConfirm,
  confirmButtonText,
  confirmButtonDisabled,
}) => {
  if (!visible) return null
  const modalRef = createRef<HTMLDivElement>()

  useEffect(() => {
    if (visible) {
      document.body.classList.add('modal-open')
    }

    function listener(ev: MouseEvent) {
      const target = ev.target as Element

      if (target.contains(modalRef.current)) {
        handleCLoseModal()
      }
    }

    if (modalRef.current) {
      document.addEventListener('click', listener)
    }

    return () => {
      document.removeEventListener('click', listener)
    }
  }, [modalRef])

  function handleCLoseModal() {
    document.body.classList.remove('modal-open')

    onClose()
  }

  return (
    <Container>
      <ModalDialog ref={modalRef}>
        <ModalContent>
          <ModalHeader>
            <h5>{title}</h5>

            <button onClick={handleCLoseModal}>
              <FiX size={24} color="#676767" />
            </button>
          </ModalHeader>
          <ModalBody>{children}</ModalBody>
          <ModalFooter>
            <CancelButton onClick={handleCLoseModal}>Cancelar</CancelButton>
            {!!onConfirm && (
              <ConfirmButton disabled={confirmButtonDisabled} onClick={onConfirm}>
                {confirmButtonText || 'Salvar'}
              </ConfirmButton>
            )}
          </ModalFooter>
        </ModalContent>
      </ModalDialog>
    </Container>
  )
}

export default Modal
