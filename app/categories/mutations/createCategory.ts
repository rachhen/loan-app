import { resolver } from "blitz"
import db from "db"
import { CreateCategory } from "../validations"

export default resolver.pipe(resolver.zod(CreateCategory), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const category = await db.category.create({ data: input })

  return category
})
