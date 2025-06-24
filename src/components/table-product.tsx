import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export function TableProduct() {
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
  )
}
