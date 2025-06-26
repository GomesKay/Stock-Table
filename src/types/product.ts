export interface Product {
  id: number
  product: string
  price: number
  status: string
  amount: number
  createdAt: string
}

export interface TableProductProps {
  filterQuery: string
}
