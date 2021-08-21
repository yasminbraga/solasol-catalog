import React, { createRef, useEffect } from 'react'

import {
  Container,
  ModalBody,
  ModalDialog,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ConfirmButton,
  ModalTitle,
} from './styles'

import { FiX } from 'react-icons/fi'

export interface ModalProps {
  title: string
  visible: boolean
  onClose: () => void
  onConfirm?: () => void
  confirmButtonText?: string
  confirmButtonDisabled?: boolean
  showOptionsButton?: boolean
  FooterModal?: () => React.ReactNode
}

const Modal: React.FC<ModalProps> = ({
  children,
  visible,
  title,
  onClose,
  onConfirm,
  FooterModal,
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
            <button onClick={handleCLoseModal}>
              <FiX size={24} color="#676767" />
            </button>

            <ModalTitle>{title}</ModalTitle>

            <ConfirmButton onClick={onConfirm}>Confirmar</ConfirmButton>
          </ModalHeader>
          <ModalBody>{children}</ModalBody>
          {FooterModal && <ModalFooter>{FooterModal()}</ModalFooter>}
        </ModalContent>
      </ModalDialog>
    </Container>
  )
}

export default Modal
