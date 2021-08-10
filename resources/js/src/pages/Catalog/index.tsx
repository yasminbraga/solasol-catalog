import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { Container, Grid, ResultItem, Results } from './styles'
import api from '../../services/api'
import Card from '../../components/Card'
import Empty from '../../components/Empty'
import Filter from '../../components/Filter'
import Loader from '../../components/Loader'
import NotFound from '../../components/NotFound'
import ProductItem from '../../components/ProductItem'
import { CatalogsResponse } from '../../interfaces/Catalog'
import Product, { ProductsResponse } from '../../interfaces/Product'
import Meta from '../../interfaces/Meta'
import Category from '../../interfaces/Category'
import Pagination from '../../components/Pagination'
import { useHeader } from '../../providers/header'

const CatalogPage: React.FC = () => {
  const params = useParams<{ id: string }>()
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState<{ data: Product[]; meta: Meta }>()
  const [invalidCatalog, setInvalidCatalog] = useState(false)
  const [categories, setCategories] = useState<Category[]>()
  const { setInvalid, setShowCartButton } = useHeader()

  const [filter, setFilter] =
    useState<{ categories?: number[]; name?: string; page?: number } | undefined>()

  const loadCategories = useCallback(async () => {
    try {
      const { data } = await api.get<CatalogsResponse>(`/catalogs/${params.id}/categories`)
      setCategories(data.categories)
      setInvalidCatalog(false)
      setInvalid(false)
    } catch (error) {
      setInvalidCatalog(true)
    }
  }, [])

  const loadProducts = useCallback(async () => {
    setLoading(true)

    try {
      const { data } = await api.get<ProductsResponse>(`/catalogs/${params.id}/products`, {
        params: {
          page: filter?.page,
          name: filter?.name,
          categoryIds: filter?.categories,
        },
      })

      setProducts(data.products)
    } catch (error) {
      setInvalidCatalog(true)
    }

    setLoading(false)
  }, [filter])

  useEffect(() => {
    if (filter?.categories) {
      loadProducts()
      window.scrollTo({ top: 0, behavior: 'auto' })
    }
  }, [filter])

  useEffect(() => {
    setShowCartButton(false)
    loadCategories()
  }, [])

  if (invalidCatalog) {
    return (
      <Container>
        <Card>
          <NotFound
            title="Catálogo inválido."
            subtitle="Contate um representante e peça um novo link."
          />
        </Card>
      </Container>
    )
  }

  return (
    <React.Fragment>
      <Filter categories={categories} onChange={setFilter} />

      {loading ? (
        <Loader />
      ) : (
        <Container>
          <Card>
            {!products?.data?.length ? (
              <Empty title="Nenhum produto encontrado." />
            ) : (
              <React.Fragment>
                <Results>
                  <ResultItem>Exibindo {products.data.length} resultados</ResultItem>
                  <ResultItem>
                    Página {products.meta.current_page} de {products.meta.last_page} - Total{' '}
                    {products.meta.total}
                  </ResultItem>
                </Results>
                <Grid>
                  {products.data.map((data) => (
                    <ProductItem key={data.id} data={data} />
                  ))}
                </Grid>
                <Pagination
                  setPage={(page) => {
                    setFilter({ ...filter, page })
                  }}
                  meta={products.meta}
                />
              </React.Fragment>
            )}
          </Card>
        </Container>
      )}
    </React.Fragment>
  )
}

export default CatalogPage
