import React, { useState } from 'react'
import Modal from '../Modal'

import { BrandTitle, NewOrderButton, ContainerHeader, ContainerOffset, Img } from './styles'

const src = require('../../assets/logoline-white-solasol.png') as string

interface HeaderProps {
  invalid: boolean
  showCart?: boolean
}

const Header: React.FC<HeaderProps> = ({ invalid = true }) => {
  const [showModal, setShowModal] = useState(false)

  return (
    <React.Fragment>
      <ContainerOffset />

      <Modal
        title={'Confirmar dados'}
        visible={showModal}
        onConfirm={() => {}}
        onClose={() => setShowModal(false)}
      >
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laborum deleniti veritatis
          quidem similique hic quisquam corporis quo quae vitae reprehenderit. Necessitatibus quos
          molestiae ad. Id, et rerum! Quaerat, fugit porro?
        </p>
        <p>
          Laborum eligendi id libero nulla quia dolorum earum. Voluptatem molestias natus est eius
          totam, sequi porro iure. Rem dolores assumenda ipsa reiciendis eos molestiae, ratione quo
          eligendi pariatur aliquid consectetur.
        </p>
        <p>
          Delectus, dolores autem? Perspiciatis aliquam eos qui. Amet rerum aliquam aperiam
          reiciendis nostrum odio a est quae eius. Quia laudantium odit accusamus laboriosam in unde
          veritatis quos quasi itaque dicta!
        </p>
        <p>
          Deserunt atque obcaecati nulla nobis! Rem numquam atque enim, obcaecati hic beatae nam
          laboriosam? At quibusdam, iusto itaque voluptatum soluta explicabo ipsa obcaecati deserunt
          odit dolorum eum, aliquid enim dolorem.
        </p>
        {/* 
        <p>
          Aliquam unde animi nisi modi, doloremque odit placeat alias praesentium est perspiciatis
          asperiores incidunt numquam consequuntur illo fugit repellendus consequatur, nesciunt
          tenetur in! Quaerat sint amet iusto in aspernatur eveniet?
        </p> */}
      </Modal>

      <ContainerHeader>
        <Img src={src} />
        {/* <BrandTitle>Sol a sol</BrandTitle> */}
        {!invalid && (
          <NewOrderButton onClick={() => setShowModal(true)}>Iniciar pedido</NewOrderButton>
        )}
      </ContainerHeader>
    </React.Fragment>
  )
}

export default Header
