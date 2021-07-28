import Product from './Product'

export default interface Category {
  nome: string
  products?: Product[]
}
