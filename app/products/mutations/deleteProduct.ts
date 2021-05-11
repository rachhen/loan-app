import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

const DeleteProduct = z
  .object({
    id: z.number(),
  })
  .nonstrict()

export default resolver.pipe(resolver.zod(DeleteProduct), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const product = await db.product.deleteMany({ where: { id } })

  return product
})
