import * as z from "zod"

export const CreateProduct = z
  .object({
    name: z.string(),
    image: z.string().optional(),
    categoryId: z.number(),
    price: z.number(),
    description: z.string().optional(),
    status: z.boolean(),
  })
  .nonstrict()
