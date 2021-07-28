import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Empty from '../../components/Empty'
import Loader from '../../components/Loader'
import NotFound from '../../components/NotFound'
import ProductItem from '../../components/ProductItem'
import Catalog from '../../interfaces/Catalog'
import Product from '../../interfaces/Product'
import api from '../../services/api'
import { Container } from './styles'

const CatalogPage: React.FC = () => {
  const params = useParams<{ id: string }>()
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState<Product[]>([])
  const [invalidCatalog, setInvalidCatalog] = useState(false)

  async function loadProducts() {
    try {
      const response = await api.get<{ catalog: Catalog; products: Product[] }>(
        `/catalogs/${params.id}/products`
      )

      console.log(response.data)
      setProducts(response.data.products)
    } catch (error) {
      console.log(error)
      setInvalidCatalog(true)
    }
    setLoading(false)
  }

  useEffect(() => {
    loadProducts()
  }, [])

  if (loading) {
    return <Loader />
  }

  if (invalidCatalog) {
    return (
      <NotFound
        title="Catálogo inválido."
        subtitle="Contate um representante e peça um novo link."
      />
    )
  }

  if (!products.length) {
    return <Empty title="Nenhum produto encontrado." />
  }

  return (
    <Container>
      {products.map((data) => (
        <ProductItem key={data.id} data={data} />
      ))}
    </Container>
  )
}

export default CatalogPage
