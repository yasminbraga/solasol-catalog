import Category from './Category'

export default interface Catalog {
  id: number
  uuid: string
}

export interface CatalogsResponse {
  catalog: Catalog
  categories: Category[]
}
