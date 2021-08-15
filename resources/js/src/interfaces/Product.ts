import File from './File'
import Meta from './Meta'

export default interface Product {
  id: number
  name: string
  price: number
  file?: File
}

export interface ProductCart extends Product {
  quantity: number
}

export interface ProductsResponse {
  products: {
    data: Product[]
    meta: Meta
  }
}
