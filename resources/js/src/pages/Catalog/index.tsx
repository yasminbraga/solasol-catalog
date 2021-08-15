import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Container } from './styles'
import api from '../../services/api'
import Card from '../../components/Card'
import Filter from '../../components/Filter'
import NotFound from '../../components/NotFound'
import Pagination from '../../components/Pagination'
import { useHeader } from '../../providers/header'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import Results from '../../components/Results'
import { fetchProducts } from '../../features/products'
import ProductItemList from '../../components/ProductItemList'

const CatalogPage: React.FC = () => {
  const params = useParams<{ id: string }>()
  const [invalidCatalog, setInvalidCatalog] = useState(false)
  const appDispatch = useAppDispatch()
  const filter = useAppSelector((state) => state.filter)

  const { setInvalid } = useHeader()

  const validateCatalog = useCallback(async () => {
    try {
      await api.get(`/catalogs/${params.id}`)
      setInvalidCatalog(false)
      return true
    } catch (error) {
      setInvalidCatalog(true)
      return false
    }
  }, [params.id])

  useEffect(() => {
    ;(async () => {
      const valid = await validateCatalog()

      setInvalid(!valid)
    })()
  }, [])

  useEffect(() => {
    appDispatch(fetchProducts(filter))
  }, [filter])

  if (invalidCatalog) {
    return (
      <NotFound
        title="Catálogo inválido."
        subtitle="Contate um representante e peça um novo link."
      />
    )
  }

  return (
    <React.Fragment>
      <Filter />

      <Container>
        <Card>
          <Results />
          <ProductItemList />
          <Pagination />
        </Card>
      </Container>
    </React.Fragment>
  )
}

export default CatalogPage
