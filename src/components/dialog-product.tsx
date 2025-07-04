import { ErrorMessage } from "@hookform/error-message"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { nanoid } from "nanoid"
import { useEffect } from "react"
import { Controller } from "react-hook-form"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

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
  type CreateProductFormSchema,
  createProductFormSchema,
} from "@/schemas/product-schema"

export function DialogProduct() {
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

  async function createProduct(data: CreateProductFormSchema) {
    const { product, price, status, amount } = data

    await axios.post("http://localhost:3333/products", {
      id: nanoid(),
      product: product,
      price: price,
      status: status,
      amount: amount,
      createdAt: new Date(),
    })

    reset()
    toast.success("Produto criado com sucesso")
  }

  return (
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
            <Input type="text" placeholder="Produto" {...register("product")} />
            <ErrorMessage
              errors={errors}
              name="product"
              render={({ message }) => (
                <p className="text-sm text-red-500">{message}</p>
              )}
            />
          </div>

          <div className="flex gap-4 max-[425px]:flex-col">
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
                statusValue === "lack" ? "cursor-not-allowed bg-zinc-800" : ""
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
  )
}
