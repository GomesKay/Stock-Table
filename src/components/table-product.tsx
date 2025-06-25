import axios from "axios"
import { useEffect, useState } from "react"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface Product {
  id: number
  product: string
  price: number
  status: string
  amount: number
  createdAt: string
}

export function TableProduct() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    async function getProducts() {
      try {
        const response = await axios.get("http://localhost:3333/products")

        setProducts(response.data)
      } catch (error) {
        console.error("Erro ao buscar produtos:", error)
      }
    }

    getProducts()
  }, [])

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-left text-white">ID</TableHead>
          <TableHead className="text-left text-white">Produto</TableHead>
          <TableHead className="text-center text-white">Quantidade</TableHead>
          <TableHead className="text-center text-white">Preço</TableHead>
          <TableHead className="text-center text-white">Status</TableHead>
          <TableHead className="text-center text-white">Data</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell>{product.id}</TableCell>
            <TableCell>{product.product}</TableCell>
            <TableCell className="text-center">{product.amount}</TableCell>
            <TableCell className="text-center">
              {product.price.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </TableCell>
            <TableCell className="text-center">
              {product.status === "stock" ? (
                <span className="cursor-pointer rounded-2xl bg-green-400 px-4 py-1 text-xs font-semibold text-black">
                  Em estoque
                </span>
              ) : (
                <span className="cursor-pointer rounded-2xl bg-red-400 px-4 py-1 text-xs font-semibold text-black">
                  Em falta
                </span>
              )}
            </TableCell>
            <TableCell className="text-center">
              {new Date(product.createdAt).toLocaleDateString("pt-BR")}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
