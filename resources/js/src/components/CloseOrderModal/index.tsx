import React from 'react'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks'
import { selectTotalPrice } from '../../features/order'
import { parseMoney } from '../../ultils'
import api from '../../services/api'
import ImmutableProductCartList from '../ImmutableProductCartList'
import Modal, { ModalProps } from '../Modal'

import { Subtitle, TotalContainer } from './styles'

const CloseOrderModal: React.FC<Pick<ModalProps, 'onClose' | 'visible'>> = ({
  onClose,
  visible,
}) => {
  const totalPrice = useAppSelector(selectTotalPrice)
  const params = useParams<{ uuid: string }>()

  async function closeOrder() {
    try {
      await api.put(`/close-orders/${params.uuid}`)
      window.location.reload()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Modal
      title="Finalizar pedido"
      visible={visible}
      showOptionsButton
      onClose={onClose}
      onConfirm={closeOrder}
      FooterModal={() => (
        <TotalContainer>
          <h4>Total</h4>
          <h4>{parseMoney(totalPrice)}</h4>
        </TotalContainer>
      )}
    >
      <Subtitle>Antes de fechar seu pedido, por favor, confirme se está tudo aí!</Subtitle>

      <ImmutableProductCartList />
    </Modal>
  )
}

export default CloseOrderModal
