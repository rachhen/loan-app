import * as z from "zod"

export const CreateProduct = z
  .object({
    name: z.string().nonempty(),
    image: z.any().nullable(),
    categoryId: z.number(),
    price: z.number(),
    description: z.string().nullable(),
    status: z.boolean(),
  })
  .nonstrict()

export const UpdateProduct = CreateProduct

export const DeleteProduct = z
  .object({
    id: z.number(),
  })
  .nonstrict()
