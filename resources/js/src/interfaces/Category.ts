import Product from './Product'

export default interface Category {
  name: string
  id: number
  products?: Product[]
}

export interface CatalogsResponse {
  categories: Category[]
}
