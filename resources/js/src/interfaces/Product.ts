import File from './File'

export default interface Product {
  id: number
  name: string
  price: number
  file?: File
}
