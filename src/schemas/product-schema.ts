import z from "zod"

export const createProductFormSchema = z
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

export type CreateProductFormSchema = z.infer<typeof createProductFormSchema>
