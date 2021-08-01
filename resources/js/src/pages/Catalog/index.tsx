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
import Header from '../../components/Header'
import Catalog from '../../interfaces/Catalog'
import Product from '../../interfaces/Product'
import Meta from '../../interfaces/Meta'
import Category from '../../interfaces/Category'
import Pagination from '../../components/Pagination'

interface ProductsResponse {
  catalog: Catalog
  products: {
    data: Product[]
    meta: Meta
  }
}

interface CatalogsResponse {
  catalog: Catalog
  categories: Category[]
}

const CatalogPage: React.FC = () => {
  const params = useParams<{ id: string }>()
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState<{ data: Product[]; meta: Meta }>()
  const [invalidCatalog, setInvalidCatalog] = useState(false)
  const [categories, setCategories] = useState<Category[]>()

  const [filter, setFilter] =
    useState<{ categories: number[]; name?: string; page?: number } | undefined>()

  const loadCategories = useCallback(async () => {
    try {
      const { data } = await api.get<CatalogsResponse>(`/catalogs/${params.id}/categories`)
      setCategories(data.categories)
    } catch (error) {
      console.log(error)
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

      // OBS:
      // verificar quando page é maior que o products.meta.last_page

      setProducts(data.products)
    } catch (error) {
      console.log(error.response)
      setInvalidCatalog(true)
    }

    setLoading(false)
  }, [filter])

  useEffect(() => {
    console.log(filter)
    if (filter?.categories) {
      loadProducts()
      window.scrollTo({ top: 0, behavior: 'auto' })
    }
  }, [filter])

  useEffect(() => {
    loadCategories()
  }, [])

  if (invalidCatalog) {
    return (
      <React.Fragment>
        <Header invalid={invalidCatalog} />

        <Container>
          <Card>
            <NotFound
              title="Catálogo inválido."
              subtitle="Contate um representante e peça um novo link."
            />
          </Card>
        </Container>
      </React.Fragment>
    )
  }

  return (
    <React.Fragment>
      <Header invalid={invalidCatalog} />

      {!!categories?.length && (
        <Filter categories={categories} onChange={(state) => setFilter(state)} />
      )}

      <Container>
        <Card>
          {loading ? (
            <Loader />
          ) : !products?.data?.length ? (
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
                  setFilter((state) => {
                    const newState = Object.assign({}, state)

                    if (newState['page']) {
                      newState['page'] = newState['page'] + page
                    } else {
                      newState['page'] = 1 + page
                    }

                    return newState
                  })
                }}
                meta={products.meta}
              />
            </React.Fragment>
          )}
        </Card>
      </Container>
    </React.Fragment>
  )
}

export default CatalogPage
