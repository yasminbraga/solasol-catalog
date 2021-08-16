import { ProductCart } from './Product'

export default interface Order {
  uuid: string
  confirmed: boolean
  closed: boolean
  customer_id: number
  user_id: number
  total_price?: number
  products?: ProductCart[]
}

export interface OrderResponse {
  order: Order
}
