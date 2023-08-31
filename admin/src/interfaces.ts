export interface getOrdersResponse {
  id: number
  status: string
  client: string
  shippingAddress: string
  shippingPromise: string
  createdAt: string
  updatedAt: string
  deletedAt: null
  items: Item[]
}

interface Item {
  id: number
  title: string
  description: string
  url: string
  price: number
  createdAt: string
  updatedAt: string
  deletedAt: null
  order_items: OrderItems
}

interface OrderItems {
  id: number
  orderId: number
  itemId: number
  quantity: number
  createdAt: string
  updatedAt: string
  deletedAt: null
}
