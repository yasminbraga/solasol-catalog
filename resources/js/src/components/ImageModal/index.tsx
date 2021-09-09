import React, { createRef, useEffect } from 'react'
import { FiX } from 'react-icons/fi'
import { Container, ImageModalContent, ImageRef } from './styles'

export interface ImageModalProps {
  visible: boolean
  onClose: () => void
  imageSrc?: string
}

const ImageModal: React.FC<ImageModalProps> = ({ imageSrc, visible, onClose }) => {
  if (!visible) return null
  const modalRef = createRef<HTMLDivElement>()

  useEffect(() => {
    if (visible) {
      document.body.classList.add('modal-open')
    }

    function listener(ev: MouseEvent) {
      const target = ev.target as Element

      if (target.contains(modalRef.current)) {
        handleCloseModal()
      }
    }

    if (modalRef.current) {
      document.addEventListener('click', listener)
    }

    return () => {
      document.removeEventListener('click', listener)
    }
  }, [modalRef])

  function handleCloseModal() {
    document.body.classList.remove('modal-open')

    onClose()
  }

  return (
    <Container>
      <ImageRef ref={modalRef}>
        <ImageModalContent>
          <button onClick={handleCloseModal}>
            <FiX size={24} color="#676767" />
          </button>

          <img src={imageSrc} alt="" />
        </ImageModalContent>
      </ImageRef>
    </Container>
  )
}

export default ImageModal
