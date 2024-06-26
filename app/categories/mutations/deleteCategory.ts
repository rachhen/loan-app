import { resolver } from "blitz"
import db from "db"
import { DeleteCategory } from "../validations"

export default resolver.pipe(resolver.zod(DeleteCategory), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const category = await db.category.deleteMany({ where: { id } })

  return category
})
