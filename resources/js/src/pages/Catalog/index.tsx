import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../services/api'

const CatalogPage: React.FC = () => {
  const params = useParams<{ id: string }>()

  async function validateCatalog() {
    try {
      const response = await api.get(`/catalogs/${params.id}`)

      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    validateCatalog()
  }, [])

  return (
    <div>
      <h1>This was made with React 😁</h1>
    </div>
  )
}

export default CatalogPage
