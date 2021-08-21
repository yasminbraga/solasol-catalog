import { ProductCart } from './Product'

export default interface Order {
  id: number
  uuid: string
  confirmed: boolean
  closed: boolean
  customer_id: number
  user_id: number
  total_price?: number
  products?: ProductCart[]
  confirmed_at: string
  closed_at: string
  number: string
}

export interface OrderResponse {
  order: Order
}
