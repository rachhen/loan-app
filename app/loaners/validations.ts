import * as z from "zod"

export const CreateLoaner = z
  .object({
    firstName: z.string(),
    lastName: z.string(),
    photo: z.any().nullable().optional(),
    phoneNumber: z.string(),
    address: z.string(),
    city: z.string(),
    description: z.string().nullable().optional(),
    groupId: z.number().nullable().optional(),
    status: z.boolean(),
  })
  .nonstrict()

export const UpdateLoaner = z
  .object({
    id: z.number(),
  })
  .merge(CreateLoaner)
  .nonstrict()

export const DeleteLoaner = z
  .object({
    id: z.number(),
  })
  .nonstrict()
