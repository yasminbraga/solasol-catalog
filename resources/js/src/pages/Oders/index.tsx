import React, { Fragment, useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import Card from '../../components/Card'
import Empty from '../../components/Empty'
import Filter from '../../components/Filter'
import Loader from '../../components/Loader'
import Pagination from '../../components/Pagination'
import ProductItemCart from '../../components/ProductItemCart'

import { CatalogsResponse } from '../../interfaces/Catalog'
import Category from '../../interfaces/Category'
import Meta from '../../interfaces/Meta'
import Product, { ProductsResponse } from '../../interfaces/Product'
import { useHeader } from '../../providers/header'
import api from '../../services/api'
import { Grid } from '../Catalog/styles'

import { Container } from './styles'

const OdersPage: React.FC = () => {
  const { setShowCartButton } = useHeader()
  const [products, setProducts] = useState<{ data: Product[]; meta: Meta }>()

  const params = useParams<{ id: string }>()

  const [categories, setCategories] = useState<Category[]>()

  const [loading, setLoading] = useState(true)
  const [filter, setFilter] =
    useState<{ categories?: number[]; name?: string; page?: number } | undefined>()

  const loadCategories = useCallback(async () => {
    try {
      const { data } = await api.get<CatalogsResponse>(`/catalogs/${params.id}/categories`)
      setCategories(data.categories)
    } catch (error) {}
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
    } catch (error) {}

    setLoading(false)
  }, [filter])

  useEffect(() => {
    setShowCartButton(true)
    loadCategories()
  }, [])

  useEffect(() => {
    loadProducts()
  }, [filter])

  return (
    <Fragment>
      <Filter
        onChange={(state) => {
          setFilter({ ...state })
        }}
        categories={categories}
      />

      {loading ? (
        <Loader />
      ) : (
        <Container>
          <Card>
            {products?.data.length ? (
              <React.Fragment>
                <Grid>
                  {products?.data?.map((product) => {
                    return <ProductItemCart key={product.id} data={product} />
                  })}
                </Grid>

                <Pagination
                  setPage={(page) => {
                    setFilter({ ...filter, page })
                  }}
                  meta={products.meta}
                />
              </React.Fragment>
            ) : (
              <Empty title="Nenhum produto encontrado" />
            )}
          </Card>
        </Container>
      )}
    </Fragment>
  )
}

export default OdersPage
