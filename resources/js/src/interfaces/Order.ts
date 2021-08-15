export default interface Order {
  id: number
  uuid: string
  confirmed: boolean
  closed: boolean
  customer_id: number
  user_id: number
  total_price?: number
}

export interface OrderResponse {
  order: Order
}
