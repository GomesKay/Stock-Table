import { ErrorMessage } from "@hookform/error-message"
import { zodResolver } from "@hookform/resolvers/zod"
import { Search } from "lucide-react"
import { useEffect } from "react"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"

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

const createProductFormSchema = z
  .object({
    product: z.string().nonempty("Nome do produto é obrigatório"),
    price: z.coerce.number().min(1, "O preço mínimo é 1"),
    status: z.enum(["stock", "lack"], {
      errorMap: () => ({ message: "Escolha o status do produto" }),
    }),
    amount: z.coerce.number(),
  })
  .refine(
    (data) => {
      if (data.status === "stock") return data.amount >= 1
      if (data.status === "lack") return data.amount === 0
      return true
    },
    {
      path: ["amount"],
      message: "Quantidade inválida para o status selecionado",
    },
  )

type CreateProductFormSchema = z.infer<typeof createProductFormSchema>

export function Dashboard() {
  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateProductFormSchema>({
    resolver: zodResolver(createProductFormSchema),
  })
  const statusValue = watch("status")

  useEffect(() => {
    if (statusValue === "lack") {
      setValue("amount", 0)
    } else if (statusValue === "stock") {
      setValue("amount", null as unknown as number)
    }
  }, [statusValue, setValue])

  function createProduct(data: CreateProductFormSchema) {
    console.log(data)

    reset()
  }

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
          <DialogTrigger asChild>
            <Button type="button" className="cursor-pointer">
              Adicionar Produto
            </Button>
          </DialogTrigger>
          <DialogContent className="border-zinc-500 bg-zinc-900 text-white">
            <DialogTitle>Criação do Produto</DialogTitle>
            <DialogDescription>
              Faça a criação do produto para seu estoque
            </DialogDescription>

            <form
              onSubmit={handleSubmit(createProduct)}
              className="flex flex-col gap-4"
            >
              <div className="flex flex-col gap-2">
                <Input
                  type="text"
                  placeholder="Produto"
                  {...register("product")}
                />
                <ErrorMessage
                  errors={errors}
                  name="product"
                  render={({ message }) => (
                    <p className="text-sm text-red-500">{message}</p>
                  )}
                />
              </div>

              <div className="flex gap-4">
                <Input
                  type="number"
                  placeholder="Preço"
                  min={1}
                  {...register("price")}
                />

                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      value={field.value ?? ""}
                    >
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
                  )}
                />

                <Input
                  type="number"
                  placeholder="Quantidade"
                  min={statusValue === "stock" ? 1 : 0}
                  readOnly={statusValue === "lack"}
                  className={
                    statusValue === "lack"
                      ? "cursor-not-allowed bg-zinc-800"
                      : ""
                  }
                  {...register("amount")}
                />
              </div>

              <div className="flex flex-col gap-2">
                <ErrorMessage
                  errors={errors}
                  name="price"
                  render={({ message }) => (
                    <p className="text-sm text-red-500">{message}</p>
                  )}
                />

                <ErrorMessage
                  errors={errors}
                  name="status"
                  render={({ message }) => (
                    <p className="text-sm text-red-500">{message}</p>
                  )}
                />

                <ErrorMessage
                  errors={errors}
                  name="amount"
                  render={({ message }) => (
                    <p className="text-sm text-red-500">{message}</p>
                  )}
                />
              </div>

              <DialogFooter>
                <Button
                  type="submit"
                  className="cursor-pointer border border-zinc-500"
                >
                  Criar produto
                </Button>
              </DialogFooter>
            </form>
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
