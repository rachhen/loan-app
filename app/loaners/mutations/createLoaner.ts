import { resolver } from "blitz"
import db from "db"
import { CreateLoaner } from "../validations"

export default resolver.pipe(resolver.zod(CreateLoaner), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const loaner = await db.loaner.create({ data: input })

  return loaner
})
