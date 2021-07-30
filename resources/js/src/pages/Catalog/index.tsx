import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Card from '../../components/Card'
import Empty from '../../components/Empty'
import Filter from '../../components/Filter'
import Loader from '../../components/Loader'
import NotFound from '../../components/NotFound'
import ProductItem from '../../components/ProductItem'
import Catalog from '../../interfaces/Catalog'
import Product from '../../interfaces/Product'
import api from '../../services/api'
import { Container, Grid } from './styles'

import Header from '../../components/Header'

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

      setProducts(response.data.products)
    } catch (error) {
      setInvalidCatalog(true)
    }
    setLoading(false)
  }

  useEffect(() => {
    loadProducts()
  }, [])

  const BaseContainer: React.FC = ({ children }) => {
    return (
      <React.Fragment>
        <Header invalid={invalidCatalog} />
        {!!products.length && <Filter />}

        <Container>
          <Card>{children}</Card>
        </Container>
      </React.Fragment>
    )
  }

  if (loading) {
    return (
      <BaseContainer>
        <Loader />
      </BaseContainer>
    )
  }

  if (invalidCatalog) {
    return (
      <BaseContainer>
        <NotFound
          title="Catálogo inválido."
          subtitle="Contate um representante e peça um novo link."
        />
      </BaseContainer>
    )
  }

  if (!products.length) {
    return (
      <BaseContainer>
        <Empty title="Nenhum produto encontrado." />
      </BaseContainer>
    )
  }

  return (
    <BaseContainer>
      <Grid>
        {products.map((data) => (
          <ProductItem key={data.id} data={data} />
        ))}
      </Grid>
    </BaseContainer>
  )
}

export default CatalogPage
