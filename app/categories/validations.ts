import * as z from "zod"

export const CreateCategory = z.object({
  name: z.string().nonempty(),
  status: z.boolean(),
})

export const UpdateCategory = z.object({
  name: z.string().nonempty(),
  status: z.boolean(),
})
