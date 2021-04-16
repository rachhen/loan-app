import * as z from "zod"

export const CreateCategory = z
  .object({
    name: z.string().nonempty(),
    status: z.boolean(),
  })
  .nonstrict()

export const UpdateCategory = z
  .object({
    id: z.number(),
    name: z.string().nonempty(),
    status: z.boolean(),
  })
  .nonstrict()

export const DeleteCategory = z
  .object({
    id: z.number(),
  })
  .nonstrict()
