import axios from "axios"
import { Trash } from "lucide-react"
import { useEffect, useState } from "react"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import type { Product, TableProductProps } from "../types/product"

export function TableProduct({ filterQuery }: TableProductProps) {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    async function getProducts() {
      try {
        const url = filterQuery
          ? `http://localhost:3333/products?product_like=${filterQuery}`
          : "http://localhost:3333/products"

        const response = await axios.get(url)

        setProducts(response.data)
      } catch (error) {
        console.error("Erro ao buscar produtos:", error)
      }
    }

    getProducts()
  }, [filterQuery])

  async function handleDeleteProduct(id: number) {
    try {
      await axios.delete(`http://localhost:3333/products/${id}`)
    } catch (error) {
      console.error("Erro ao deletar produto:", error)
    }
  }

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
        {products.length ? (
          products.map((product) => (
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
              <TableCell>
                <Trash
                  size={18}
                  className="cursor-pointer hover:text-red-400"
                  onClick={() => handleDeleteProduct(product.id)}
                />
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={6} className="h-12 text-center">
              Nenhum produto encontrado
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
