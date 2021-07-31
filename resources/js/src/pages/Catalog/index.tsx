import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import api from '../../services/api'
import { Container, Grid } from './styles'
import Card from '../../components/Card'
import Empty from '../../components/Empty'
import Filter from '../../components/Filter'
import Loader from '../../components/Loader'
import NotFound from '../../components/NotFound'
import ProductItem from '../../components/ProductItem'
import Header from '../../components/Header'
import Pagination from '../../components/Pagination'
import Catalog from '../../interfaces/Catalog'
import Product from '../../interfaces/Product'
import Meta from '../../interfaces/Meta'
import Category from '../../interfaces/Category'

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
  const [loadingMore, setLoadingMore] = useState(false)
  const [products, setProducts] = useState<{ data: Product[]; meta: Meta }>()
  const [invalidCatalog, setInvalidCatalog] = useState(false)
  const [page, setPage] = useState(1)
  const [categories, setCategories] = useState<Category[]>()

  const [filter, setFilter] = useState<{ categories: number[]; name?: string }>({ categories: [] })

  const loadProducts = useCallback(async () => {
    setLoadingMore(true)
    try {
      const { data } = await api.get<ProductsResponse>(`/catalogs/${params.id}/products`, {
        params: {
          page,
          name: filter?.name,
          categoryIds: filter.categories,
        },
      })

      setProducts((products) => {
        if (products?.data.length) {
          return {
            data: [...products.data, ...data.products.data],
            meta: data.products.meta,
          }
        } else {
          return data.products
        }
      })
    } catch (error) {
      console.log(error.response)
      setInvalidCatalog(true)
    }

    setLoadingMore(false)
    setLoading(false)
  }, [page])

  const filterProducts = async () => {
    setLoading(true)
    try {
      const { data } = await api.get<ProductsResponse>(`/catalogs/${params.id}/products`, {
        params: {
          page,
          name: filter?.name,
          categoryIds: filter.categories,
        },
      })

      setProducts(data.products)
    } catch (error) {
      console.log(error.response)
      setInvalidCatalog(true)
    }

    setLoading(false)
  }

  const loadCategories = useCallback(async () => {
    try {
      const { data } = await api.get<CatalogsResponse>(`/catalogs/${params.id}/categories`)
      setCategories(data.categories)
    } catch (error) {
      console.log(error)
    }
  }, [])

  useEffect(() => {
    loadProducts()
  }, [page])

  useEffect(() => {
    loadCategories()
  }, [])

  useEffect(() => {
    if (filter.name || filter.categories.length) {
      filterProducts()
    }
  }, [filter])

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
              <Grid>
                {products.data.map((data) => (
                  <ProductItem key={data.id} data={data} />
                ))}
              </Grid>
              <Pagination
                page={page}
                setPage={setPage}
                meta={products.meta}
                loading={loadingMore}
              />
            </React.Fragment>
          )}
        </Card>
      </Container>
    </React.Fragment>
  )
}

export default CatalogPage
