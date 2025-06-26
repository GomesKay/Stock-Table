import { zodResolver } from "@hookform/resolvers/zod"
import { Search } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { DialogProduct } from "@/components/dialog-product"
import { TableProduct } from "@/components/table-product"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const getProductByNameFormSchema = z.object({
  query: z.string(),
})

type GetProductByNameFormSchema = z.infer<typeof getProductByNameFormSchema>

export function Dashboard() {
  const [query, setQuery] = useState("")

  const { register, handleSubmit, reset } = useForm<GetProductByNameFormSchema>(
    {
      resolver: zodResolver(getProductByNameFormSchema),
    },
  )

  async function getProductByName(data: GetProductByNameFormSchema) {
    setQuery(data.query)

    reset()
  }

  return (
    <div className="font-text flex min-h-screen flex-col items-center justify-center gap-4">
      <div className="flex w-[1000px] justify-between">
        <form onSubmit={handleSubmit(getProductByName)} className="flex gap-4">
          <Input
            type="search"
            className="w-60 text-white"
            placeholder="Filtrar produto"
            {...register("query")}
          />
          <Button type="submit" className="cursor-pointer">
            <Search size={20} />
          </Button>
        </form>

        <DialogProduct />
      </div>

      <div className="w-[1100px] rounded-md border text-white">
        <TableProduct filterQuery={query} />
      </div>
    </div>
  )
}
