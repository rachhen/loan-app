import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

const UpdateCategory = z
  .object({
    id: z.number(),
    name: z.string(),
  })
  .nonstrict()

export default resolver.pipe(
  resolver.zod(UpdateCategory),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const category = await db.category.update({ where: { id }, data })

    return category
  }
)
