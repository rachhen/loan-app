import { resolver } from "blitz"
import db from "db"
import { DeleteLoaner } from "../validations"

export default resolver.pipe(resolver.zod(DeleteLoaner), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const loaner = await db.loaner.deleteMany({ where: { id } })

  return loaner
})
