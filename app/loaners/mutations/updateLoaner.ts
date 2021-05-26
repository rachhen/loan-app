import { resolver } from "blitz"
import db from "db"
import { UpdateLoaner } from "../validations"

export default resolver.pipe(
  resolver.zod(UpdateLoaner),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const loaner = await db.loaner.update({ where: { id }, data })

    return loaner
  }
)
