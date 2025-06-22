import { Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

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

        <Dialog>
          <DialogTrigger>
            <Button className="cursor-pointer">Adicionar Produto</Button>
          </DialogTrigger>
          <DialogContent className="border-zinc-500 bg-zinc-900 text-white">
            <DialogTitle>Criação do Produto</DialogTitle>
            <DialogDescription>
              Faça a criação do produto para seu estoque
            </DialogDescription>

            <Input type="text" placeholder="Produto" />

            <div className="flex gap-4">
              <Input type="number" placeholder="Preço" min={0} />

              <Select>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Selecione o status" />
                </SelectTrigger>
                <SelectContent className="border-zinc-500 bg-zinc-900 text-white">
                  <SelectGroup>
                    <SelectItem value="stock">Em estoque</SelectItem>
                    <SelectItem value="lack">Em falta</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              <Input type="number" placeholder="Quantidade" min={0} />
            </div>

            <DialogFooter>
              <Button className="cursor-pointer border border-zinc-500">
                Criar produto
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="w-[1000px] rounded-md border text-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-left text-white">ID</TableHead>
              <TableHead className="text-left text-white">Produto</TableHead>
              <TableHead className="text-center text-white">
                Quantidade
              </TableHead>
              <TableHead className="text-center text-white">Preço</TableHead>
              <TableHead className="text-center text-white">Status</TableHead>
              <TableHead className="text-center text-white">Data</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>bd544564fe</TableCell>
              <TableCell>Tablet Samsung 10 FE</TableCell>
              <TableCell className="text-center">5</TableCell>
              <TableCell className="text-center">R$ 2.999,00</TableCell>
              <TableCell className="text-center">
                <span className="cursor-pointer rounded-2xl bg-green-400 px-4 py-1 text-xs font-semibold text-black">
                  Em estoque
                </span>
              </TableCell>
              <TableCell className="text-center">20/06/2025</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>bd544564fe</TableCell>
              <TableCell>Funko Pop! Itachi Uchiha</TableCell>
              <TableCell className="text-center">3</TableCell>
              <TableCell className="text-center">R$ 149,00</TableCell>
              <TableCell className="text-center">
                <span className="cursor-pointer rounded-2xl bg-green-400 px-4 py-1 text-xs font-semibold text-black">
                  Em estoque
                </span>
              </TableCell>
              <TableCell className="text-center">20/06/2025</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>bd544564fe</TableCell>
              <TableCell>Funko Pop! Sasuke Uchiha Exclusive Glow</TableCell>
              <TableCell className="text-center">0</TableCell>
              <TableCell className="text-center">R$ 179,00</TableCell>
              <TableCell className="text-center">
                <span className="cursor-pointer rounded-2xl bg-red-400 px-4 py-1 text-xs font-semibold text-black">
                  Em falta
                </span>
              </TableCell>
              <TableCell className="text-center">20/06/2025</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
