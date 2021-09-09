import React, { useState } from 'react'
import Product from '../../interfaces/Product'

import { Container, ProductImage, ProductContent, ProductName, ProductPrice } from './styles'

import ImageModal from '../ImageModal'

interface ProductItemProps {
  data: Product
}

const ProductItem: React.FC<ProductItemProps> = ({ data }) => {
  const [showImageModal, setShowImageModal] = useState(false)

  return (
    <>
      <ImageModal
        visible={showImageModal}
        onClose={() => setShowImageModal(false)}
        imageSrc={data.file?.secure_url}
      />
      <Container>
        <ProductImage
          src={data.file?.secure_url}
          alt={data.name}
          onClick={() => {
            setShowImageModal(true)
          }}
        />

        <ProductContent>
          <ProductName title={data.name}>{data.name}</ProductName>
          <ProductPrice>
            {Number(data.price).toLocaleString('pt-BR', { currency: 'BRL', style: 'currency' })}
          </ProductPrice>
        </ProductContent>
      </Container>
    </>
  )
}

export default ProductItem
