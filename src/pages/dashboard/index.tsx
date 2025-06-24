import { Search } from "lucide-react"

import { DialogProduct } from "@/components/dialog-product"
import { TableProduct } from "@/components/table-product"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Dashboard() {
  return (
    <div className="font-text flex min-h-screen flex-col items-center justify-center gap-4">
      <div className="flex w-[1000px] justify-between">
        <div className="flex gap-4">
          <Input
            type="search"
            className="w-60 text-white"
            placeholder="Filtrar produto"
          />
          <Button type="button" className="cursor-pointer">
            <Search size={20} />
          </Button>
        </div>

        <DialogProduct />
      </div>

      <div className="w-[1000px] rounded-md border text-white">
        <TableProduct />
      </div>
    </div>
  )
}
